const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const colluser = "users";
const collgames = "games";

const app = new express();
app.use(express.static(path.join(__dirname,'../public')));
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

app.get('/Sign', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/signup.html'))
});

app.post('/createAccount', (req, res) => {
	console.log(req.body);
	if(req.body.pass != req.body.passC) {
		console.log('Password doesnt match');
		res.redirect('/Sign');
		return;
	}
	db.getDB().collection(colluser).find({}).count((err, count) => {
		if(err) {
			console.log(err);
		}
		else {
			db.getDB().collection(colluser).insert({
				id: count,
				username: req.body.username,
				email: req.body.email,
				birthdate: req.body.birth,
				password: req.body.pass
			}, (err, document) => {
				if(err) {
					console.log(err);
					res.redirect('/Sign');
					return;
				}
				if(document == null) {
					res.redirect('/Sign');
					console.log('Error while creating account');
					return;
				}
				console.log('Success');
				res.redirect('/')
			})
		}
	});
})


app.post('/validateSign', (req, res) => {
	console.log(req.body.email);
	db.getDB().collection(colluser).findOne({email: req.body.email, password: req.body.pass}, (err, document) => {
		if(err) {
			console.log(err);
		}
		else {
			if(document != null) {
				console.log('user ' + document.username + ' Signed in');
				res.redirect('/Home?id=' + document.id);
				return;
			}
			else {
				console.log('nonexisten user');
				res.redirect('/');
			}
		}
	});
});

app.get('/Home', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/home.html'));;
				}
			}
		});
	}
});

app.get('/Library', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/library.html'));;
				}
			}
		});
	}
});

app.get('/Settings', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/settings.html'));;
				}
			}
		});
	}
});

app.get('/Search', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/search.html'));;
				}
			}
		});
	}
});

app.get('/Game', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/game.html'));;
				}
			}
		});
	}
});

app.get('/User', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/user.html'));;
				}
			}
		});
	}
});

app.get('/Add', async (req, res) => {
	if(req.query.id == null) {
		res.redirect('/');
		return;
	}
	else {
		db.getDB().collection(colluser).findOne({id: parseInt(req.query.id)}, (err, doc) => {
			if(err) {
				console.log(err);
			}
			else {
				if(doc == null) {
					res.redirect('/');
					return;
				}
				else {
					console.log(doc.username);
					res.sendFile(path.resolve(__dirname, '../frontend/add_game.html'));;
				}
			}
		});
	}
});

//regresa todos los juegos 
app.get('/games', (req, res) => {
	console.log(req.body.email);
	db.getDB().collection(collgames).find({}).limit(10).toArray((err, documents) => {		
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



app.get('/Sign', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/signup.html'))
});

app.get('/Settings', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/settings.html'))
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