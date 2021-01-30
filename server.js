const express = require('express');

const app = express();
const http = require('http').createServer(app);

const BASE_DIR = __dirname;

console.log(`${__dirname}/dist/index.html`);

app.use(express.static(`${BASE_DIR}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Listening on ${http.address().port}`);
});
