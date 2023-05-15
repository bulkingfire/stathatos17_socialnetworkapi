const express = require('express');

const db = require('./config/connection');

const routes = require('./routes');

const CWD12 = process.cwd();

const PORT = process.env.PORT || 3150;
const app = express();


const activity = CWD12.includes('01-Activities')

  ? CWD12.split('/01-Activities/')[2]
  : CWD12;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(routes);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);

  });
});
