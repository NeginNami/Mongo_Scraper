const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect("mongodb://localhost/mongo_scraper");
	mongoose.connection
		.once('open', () => {
			//console.log("Good to go!");
			done();
		})
		.on('error', (error) => {
			console.warn("Warning", error);
		});
});

beforeEach((done) => {
	mongoose.connection.collections.articles.drop(() => {
		done();
	});
});