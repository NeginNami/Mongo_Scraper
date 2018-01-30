var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var artcle = require("../model/article");
const mongoose = require('mongoose');
mongoose.Promise = Promise;

router.get('/', function(req, res) {

	artcle.find({}).then((data) => {
		//console.log(data);
		var obj = {
			articles: data
		};
		res.render("index", obj);
	});
});

// Scrape data from one site and place it into the mongodb db
router.post("/scrape", function(req, res) {

	// Make a request for the news section of ycombinator
	request("https://www.nytimes.com/", function(error, response, html) {

		// Load the html body from request into cheerio
		var $ = cheerio.load(html);
		// For each element with a "title" class
		$("article").each(function(i, element) {
			// Save the text and href of each link enclosed in the current element
			var titleC = $(element).children("h2").text().trim();
			var summaryC = $(element).children("p.summary").text().trim();
			var linkC = $(element).children("h2.story-heading").children("a").attr("href");
			var obj = {
				title: titleC,
				link: linkC,
				description: summaryC
			};

			if (obj.title !== '' && obj.description !== '') {

				artcle.create(obj).then(function(databack) {
						//res.send(obj2);
						console.log(databack);
					})
					.catch(function(err) {
						// If an error occurred, send it to the client
						res.json(err);
					});
			}
			//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		});
		//console.log("------------------------------------------");

	});
	//console.log("****************************************");
	res.send({ cond: "Good" });

});

module.exports = router;