const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
	priority: String,
	issueType: String,
	flightNumber: String,
	seatNumber: String,
	comments: String,
	crewId: Number,
	passengerName: String,
	time: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Alert', AlertSchema);