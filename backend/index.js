const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const colluser = "users";
const collgames = "games";

const app = new express();
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

db.connect((err) => {
	if(err) {
		console.log('Unable to connect to db');
		process.exit(1);	
	}
	else {
		app.listen(8080, () => {
			console.log('Conected to DB, listening in port 8080');
		});
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/login.html'));;
});

app.post('/validateSign', (req, res) => {
	console.log(req.body.email);
	db.getDB().collection(colluser).find({email: req.body.email}).limit(10).toArray((err, documents) => {
		if(err) {
			console.log(err);
		}
		else {
			console.log(documents);
			res.json(documents);	
		}
	});
});

/*
app.get('/validateSign', async (req, res) => {
	console.log(req.params.email);
	console.log(req.params.password);

	var client = await MongoClient.connect(url, { 
		useNewUrlParser: true, 
		useUnifiedTopology: true,
	});

	var db = client.db('Nosesmash');
	user = await db.collection("users").findOne({'email': req.body.email, 'password': req.body.password});
	console.log(user);
	if(user != null)
	{
		res.redirect('/Home');
	} else {
		res.redirect('/')
	}

	client.close();
});

app.get('/Home', async (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/home.html'));;
});

app.post('/Home', async (req, res) => {

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
*/