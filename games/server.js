const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('EmulatorJS-main'));

app.get('/data', function (req, res) {
    res.sendFile(path.join(__dirname, '/EmulatorJS-main/data'));
})

app.get('/data/loader.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/EmulatorJS-main/data/loader.js'));
})

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/game.html'));
})

app.listen(8080, () => console.log('Application is running'));
