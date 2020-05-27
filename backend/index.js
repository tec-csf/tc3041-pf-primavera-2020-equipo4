const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');

const app = new express();
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const url = 'mongodb+srv://admin:12345@project-c6b6w.gcp.mongodb.net/test?retryWrites=true&w=majority';

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/login.html'));;
});

app.post('/validateSign', async (req, res) => {
	console.log(req.body.email);
	console.log(req.body.password);

	var client = await MongoClient.connect(url, { 
		useNewUrlParser: true, 
		useUnifiedTopology: true,
	});

	var db = client.db('Nosesmash');
	var user = await db.collection("users").findOne({'email': req.body.email, 'password': req.body.password});
	console.log(user);

	client.close();

	res.json({username: user.username});
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