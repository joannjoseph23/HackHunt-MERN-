const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { connectDB } = require('./shared');
require('dotenv').config();

// Local schema just for Overview tab
const overviewSchema = new mongoose.Schema({
  name: String,
  url: String,
  runsFrom: String,
  happening: String,
  twitter: String,
  discord: String,
  image: String
});

const HackathonOverview = mongoose.model('HackathonOverview', overviewSchema);

async function scrapeOverviewOnly() {
  await connectDB();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const hackathons = await mongoose.connection.collection('hackathons').find().toArray();
  console.log(`🔍 Scraping ${hackathons.length} hackathons`);

  for (const hackathon of hackathons) {
    try {
      console.log(`🧭 Visiting ${hackathon.name}`);
      await page.goto(hackathon.url, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(2000);

      const data = await page.evaluate(() => {
        const getText = (label) => {
          const labelEl = Array.from(document.querySelectorAll('p')).find(p => p.innerText.includes(label));
          return labelEl?.nextElementSibling?.innerText.trim() || '';
        };

        const getLink = (contains) => {
          const el = Array.from(document.querySelectorAll('a')).find(a => a.href.includes(contains));
          return el?.href || '';
        };

        const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';

        return {
          runsFrom: getText('Runs from'),
          happening: getText('Happening'),
          twitter: getLink('x.com') || getLink('twitter.com'),
          discord: getLink('discord'),
          image: ogImage,
        };
      });

      await HackathonOverview.updateOne(
        { url: hackathon.url },
        { $set: { name: hackathon.name, url: hackathon.url, ...data } },
        { upsert: true }
      );

      console.log(`✅ Saved ${hackathon.name}`);
    } catch (err) {
      console.error(`❌ Error scraping ${hackathon.name}: ${err.message}`);
    }
  }

  await browser.close();
  mongoose.connection.close();
  console.log('🚀 Done scraping overview tab!');
}

scrapeOverviewOnly();
