const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.listen(3000, () => console.log('Running server on http://localhost:3000'));