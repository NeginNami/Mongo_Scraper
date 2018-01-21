const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongo_scraper");
mongoose.connection
	.once('open', () => {
		console.log("Good to go!");
	})
	.on('error', (error) => {
		console.warn("Warning", error);
	});