const puppeteer = require('puppeteer');
require("dotenv").config();

const scrapeEmirates = async () => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox", 
      "--disable-setuid-sandbox",
      "—-single-process",
      "--no-zygote",
    ],
    executablePath: 
    process.env.NODE_ENV == "production" 
    ? process.env.PUPPETEER_EXECUTABLE_PATH
    : puppeteer.executablePath(),
  });

  try {
  const page = await browser.newPage();
  await page.goto('https://www.emiratesgroupcareers.com/search-and-apply/379622', { waitUntil: 'domcontentloaded' });

  const tweetHandles = await page.$$(`div.job-search`);
  let title = null;
  for (const tweetHandle of tweetHandles) {
    title = await page.evaluate(el => el.querySelector('div.job-description > h4').textContent, tweetHandle);
    console.log(title);  //  debugging
    if (title) break;  
  }
  } catch (e) {
    console.log(e)
    res.send(`Something went wrong while running puppeteer`)
  } finally { 
    await browers.close();
    return title;
  }
};

module.exports = scrapeEmirates;
