const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { connectDB } = require('./shared');
require('dotenv').config();

// Schema
const scheduleSchema = new mongoose.Schema({
  name: String,
  url: String,
  schedule: [{
    date: String,
    time: String,
    title: String
  }]
});

const HackathonSchedule = mongoose.model('HackathonSchedule', scheduleSchema);

async function scrapeSchedules() {
  await connectDB();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const hackathons = await mongoose.connection.collection('hackathons').find().toArray();
  console.log(`📅 Scraping schedules for ${hackathons.length} hackathons`);

  for (const hackathon of hackathons) {
    try {
      const scheduleUrl = hackathon.url.endsWith('/')
        ? hackathon.url + 'schedule'
        : hackathon.url + '/schedule';

      console.log(`🔗 Visiting ${scheduleUrl}`);
      await page.goto(scheduleUrl, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(2000);

      const schedule = await page.evaluate(() => {
        const dateBlocks = Array.from(document.querySelectorAll('[class*="Schedule-style__LabelContainer"]'));
        const allEvents = [];

        dateBlocks.forEach(dateBlock => {
          const date = dateBlock.querySelector('p')?.innerText || '';

          // Get the container that follows, which includes time+title rows
          const eventContainer = dateBlock.parentElement?.nextElementSibling;
          if (!eventContainer) return;

          const rows = Array.from(eventContainer.querySelectorAll('[class*="EventCard__StyledFlex"]'));
          rows.forEach(row => {
            const time = row.querySelector('p')?.innerText || '';
            const title = row.querySelectorAll('p')[1]?.innerText || '';
            if (time && title) {
              allEvents.push({ date, time, title });
            }
          });
        });

        return allEvents;
      });

      await HackathonSchedule.updateOne(
        { url: hackathon.url },
        { $set: { name: hackathon.name, url: hackathon.url, schedule } },
        { upsert: true }
      );

      console.log(`✅ Saved: ${hackathon.name} (${schedule.length} events)`);
    } catch (err) {
      console.error(`❌ Error scraping ${hackathon.name}:`, err.message);
    }
  }

  await browser.close();
  mongoose.connection.close();
  console.log('🚀 Done scraping schedules!');
}

scrapeSchedules();
