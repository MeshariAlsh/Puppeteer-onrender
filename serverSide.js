const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const scrapeEmirates = require('./Webscrapper/Emirates');
const scrapeNahdi = require('./Webscrapper/Nahdi');
const scrapePepsico = require('./Webscrapper/Pepsico');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

let emiratesStatus = 'Closed';
let nahdiStatus = 'Closed';
let pepsicoStatus = 'Closed';

const updateStatuses = async () => {
  try {
    const emiratesTitle = await scrapeEmirates();
    const nahdiTitle = await scrapeNahdi();
    const pepsicoTitle = await scrapePepsico();

    emiratesStatus = emiratesTitle ? 'Apply' : 'Closed';
    nahdiStatus = nahdiTitle ? 'Apply' : 'Closed';
    pepsicoStatus = pepsicoTitle ? 'Apply' : 'Closed';

    console.log(`Statuses updated: Emirates - ${emiratesStatus}, Nahdi - ${nahdiStatus}, Pepsico - ${pepsicoStatus}`);
  } catch (error) {
    console.error('Error updating statuses:', error);
  }
};

// Schedule the scraping to run every 24 hours
cron.schedule('0 0 * * *', updateStatuses); // This cron expression means "At 00:00 (midnight) every day"


updateStatuses();

app.get('/scrape-emirates', (req, res) => {
  res.json({ status: 'success', title: emiratesStatus });
});

app.get('/scrape-nahdi', (req, res) => {
  res.json({ status: 'success', title: nahdiStatus });
});

app.get('/scrape-pepsico', (req, res) => {
  res.json({ status: 'success', title: pepsicoStatus });
});

app.get('/scrape-all', (req, res) => {
  res.json({
    status: 'success',
    results: [
      { company: 'Emirates', status: emiratesStatus },
      { company: 'Nahdi', status: nahdiStatus },
      { company: 'Pepsico', status: pepsicoStatus },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
