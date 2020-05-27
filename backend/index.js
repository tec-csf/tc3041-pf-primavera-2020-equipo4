const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb');
const assert = require('assert');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = new express();
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const url = 'mongodb+srv://admin:12345@project-c6b6w.gcp.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect(function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");
  
	client.close();
});

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/login.html'));;
});

app.post('/sign_in_form', function(req, res) {
	const {email, password} = req.body;
	console.log(email);
	console.log(password);
	
	client.connect(function(err, client) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
	  
		const db = client.db("Nosesmash");
		var user = db.collection("users").findOne({'email': email, 'password': password});
		console.log(user);;
	});
	client.close();
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