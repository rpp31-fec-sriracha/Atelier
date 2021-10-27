const express = require('express');
const app = express();
const path = require('path');
const api = require('./api.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// app.get()


app.listen(3000, () => console.log('Running server on http://localhost:3000'));