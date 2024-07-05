const puppeteer = require('puppeteer');

const scrapeNahdi = async () => {
  const browser = await puppeteer.launch({
    headless: true,  
    defaultViewport: false,
   args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.drjobpro.com/job/view/2855654?source=jooble', { waitUntil: 'domcontentloaded' });

  const tweetHandles = await page.$$(`div.job_details_info_box`);
  let title = null;
  for (const tweetHandle of tweetHandles) {
    title = await page.evaluate(el => el.querySelector("div.job_head_block > h1").textContent, tweetHandle);
    console.log(title);  //  debugging
    if (title) break;  
  }

  await browser.close();
  return title;
};

module.exports = scrapeNahdi;
