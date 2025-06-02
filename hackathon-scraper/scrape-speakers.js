const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { connectDB } = require('./shared');
require('dotenv').config();

// Mongo schema
const speakerSchema = new mongoose.Schema({
  name: String,
  url: String,
  speakers: [{
    name: String,
    title: String,
    image: String,
    link: String
  }]
});

const HackathonSpeakers = mongoose.model('HackathonSpeakers', speakerSchema);

async function scrapeSpeakers() {
  await connectDB();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const hackathons = await mongoose.connection.collection('hackathons').find().toArray();
  console.log(`🎤 Scraping speakers for ${hackathons.length} hackathons`);

  for (const hackathon of hackathons) {
    try {
      const speakersUrl = hackathon.url.endsWith('/')
        ? hackathon.url + 'speakers-judges'
        : hackathon.url + '/speakers-judges';

      console.log(`🔗 Visiting ${speakersUrl}`);
      await page.goto(speakersUrl, { waitUntil: 'networkidle2' });

      // Get JSON data directly from window.__NEXT_DATA__
      const data = await page.evaluate(() => {
        return window.__NEXT_DATA__;
      });

      const judges = data?.props?.pageProps?.hackathon?.judges || [];

      const speakers = judges.map(judge => ({
        name: judge.name || '',
        title: judge.job_title || '',
        image: judge.profile_img || '',
        link:
          judge.twitter ||
          judge.linkedin ||
          judge.instagram ||
          judge.website ||
          ''
      }));

      await HackathonSpeakers.updateOne(
        { url: hackathon.url },
        { $set: { name: hackathon.name, url: hackathon.url, speakers } },
        { upsert: true }
      );

      console.log(`✅ Saved: ${hackathon.name} (${speakers.length} speakers)`);
    } catch (err) {
      console.error(`❌ Error scraping ${hackathon.name}:`, err.message);
    }
  }

  await browser.close();
  mongoose.connection.close();
  console.log('🚀 Done scraping speakers tab!');
}

scrapeSpeakers();
