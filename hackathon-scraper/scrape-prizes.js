const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { connectDB } = require('./shared');
require('dotenv').config();

// Define schema for Prizes tab
const prizeSchema = new mongoose.Schema({
  name: String,
  url: String,
  prizePool: String,
  organizer: String
});

const HackathonPrizes = mongoose.model('HackathonPrizes', prizeSchema);

async function scrapePrizesTab() {
  await connectDB();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const hackathons = await mongoose.connection.collection('hackathons').find().toArray();
  console.log(`🔍 Scraping Prizes tab for ${hackathons.length} hackathons`);

  for (const hackathon of hackathons) {
    try {
      const prizesUrl = hackathon.url.endsWith('/') ? hackathon.url + 'prizes' : hackathon.url + '/prizes';
      console.log(`🏆 Visiting ${prizesUrl}`);
      await page.goto(prizesUrl, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(2000);

      // Extract prizePool and organizer
     const data = await page.evaluate(() => {
  const allP = Array.from(document.querySelectorAll('p'));
  let prizePool = '';
  let organizer = '';

  // Prize Pool
  for (let i = 0; i < allP.length; i++) {
    if (allP[i].innerText.trim().toLowerCase() === 'prize pool') {
      prizePool = allP[i + 1]?.innerText.trim() || '';
      break;
    }
  }

  // Organizer (more reliable DOM traversal)
  const organizerSection = Array.from(document.querySelectorAll('#prizes-sidebar-container p'))
    .find(p => p.innerText.trim().toLowerCase() === 'organizer');

  if (organizerSection) {
    const container = organizerSection.parentElement?.nextElementSibling;
    organizer = container?.querySelector('p')?.innerText.trim() || '';
  }

  return { prizePool, organizer };
});


      await HackathonPrizes.updateOne(
        { url: hackathon.url },
        { $set: { name: hackathon.name, url: hackathon.url, ...data } },
        { upsert: true }
      );

      console.log(`✅ Saved: ${hackathon.name}`, data);
    } catch (err) {
      console.error(`❌ Error scraping ${hackathon.name}:`, err.message);
    }
  }

  await browser.close();
  mongoose.connection.close();
  console.log('🚀 Done scraping Prizes tab!');
}

scrapePrizesTab();
