var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

var myarr = [];
router.get('/', function(req, res) {
	res.render("index");
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
				summary: summaryC,
				link: linkC
			};
			if (obj.title !== '' && obj.summary !== '')
				myarr.push(obj);

		});

		console.log(myarr);
		res.send(myarr);
	});

});

module.exports = router;