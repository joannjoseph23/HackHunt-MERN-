const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
require('dotenv').config();

// Mongoose Schema
const hackathonSchema = new mongoose.Schema({
  name: String,
  date: String,
  image: String,
  url: String
});
const Hackathon = mongoose.model('Hackathon', hackathonSchema);

// Scroll helper
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 250);
    });
  });
}

// Main scraper
async function scrapeAndSave() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Go to Devfolio hackathons page
  await page.goto('https://devfolio.co/hackathons', { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.waitForTimeout(2000);

  // Scrape basic data + URLs
  const hackathons = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[class*="CompactHackathonCard"]'));
    const results = [];

    for (const card of cards) {
      const name = card.querySelector('h3')?.innerText?.trim() || '';

      let date = Array.from(card.querySelectorAll('p'))
        .map(p => p.innerText.trim())
        .find(t => t.toLowerCase().includes('starts'))?.replace('Starts', '').trim() || '';

      if (!date) {
        date = 'Open';
      }

      const url = card.querySelector('a[href*=".devfolio.co"]')?.href || '';

      if (name && url) {
        results.push({ name, date, url });
      }
    }

    return results;
  });

  console.log(`🧭 Found ${hackathons.length} hackathons`);

  // Visit each hackathon detail page and get the og:image
  const finalData = [];

  for (const [index, hack] of hackathons.entries()) {
    try {
      const hackPage = await browser.newPage();
      await hackPage.goto(hack.url, { waitUntil: 'domcontentloaded' });

      const image = await hackPage.$eval('meta[property="og:image"]', el =>
        el.getAttribute('content')
      );

      finalData.push({
        ...hack,
        image
      });

      console.log(`✅ [${index + 1}] ${hack.name}`);
      await hackPage.close();
    } catch (err) {
      console.warn(`❌ Skipping: ${hack.name}`);
    }
  }

  await Hackathon.deleteMany();
  await Hackathon.insertMany(finalData);
  console.log('✅ Data saved to MongoDB');

  await browser.close();
  mongoose.connection.close();
}

scrapeAndSave();
