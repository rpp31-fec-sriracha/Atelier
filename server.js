const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/client/dist'));



app.listen(3000);