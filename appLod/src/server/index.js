const express = require('express');
const os = require('os');
const ckan = require('./ckan');
const lodData = require('./lod');

const app = express();
var api = new ckan;
app.use(express.static('dist'));

// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// var state = api.main("http://datahub.io/api/3/action/");
app.get('/api/getData', (req, res) => res.send({ datasets: lodData }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
