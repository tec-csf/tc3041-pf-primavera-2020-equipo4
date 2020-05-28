const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "Nosesmash";
const url = 'mongodb+srv://admin:12345@project-c6b6w.gcp.mongodb.net/test?retryWrites=true&w=majority';

const state = {
	db : null
};

const connect = (cb) => {
	if(state.db){
		cb();
	}
	else {
		MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
			if(err) {
				cb(err);
			}
			else {
				state.db = client.db(dbname);
				cb();
			}
		});
	}
};

const getPrimaryKey = (_id) => {
	return ObjectID(_id);
};

const getDB = () => {
	return state.db;
};

module.exports = {connect, getPrimaryKey, getDB};