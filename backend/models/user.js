const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: {
		type: Number,
	},
	username: String,
	email: String,
	birthdate: Date,
	password: String,
});

module.exports = mongoose.model('User', UserSchema);