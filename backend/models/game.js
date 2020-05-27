const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	title: String,
	publisher: String,
	developer: String,
	release: Date,
	genre: String,
	rating: String,
	price: Number,
	review: [{
		id: {
			type: Number,
		},
		user_id: Number,
		data: String,
		grade: Number
	}]
});

module.exports = mongoose.model('Game', GameSchema);