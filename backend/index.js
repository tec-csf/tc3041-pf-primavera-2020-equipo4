const express = require('express');
const path = require('path');

const app = new express();
app.use(express.static(path.join(__dirname,'../frontend')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/login.html'))
});

app.get('/Home', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/home.html'))
});

app.get('/Library', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/library.html'))
});

app.get('/Sign', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/signup.html'))
});

app.get('/Settings', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/settings.html'))
});

app.get('/Game', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/game.html'))
});

app.get('/User', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/user.html'))
});

app.get('/Add', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/add_game.html'))
});

app.get('/Search', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/search.html'))
});

app.listen(8080, () => {
	console.log("running on port 8080");
});