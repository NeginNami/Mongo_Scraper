const assert = require("assert");
const Article = require("../model/article");

describe("Reading users from database", () => {
	let article7;

	beforeEach((done) => {
		article7 = new Article({
			title: "Title7",
			link: "link7",
			description: "description7"
		});

		article7.save()
			.then(() => done());
	});

	it("Find all the users with the title of Title7", (done) => {
		Article.find({ title: "Title7" })
			.then((data) => {
				console.log(article7._id);
				console.log(data[0]._id);
				assert(data[0]._id.toString() === article7._id.toString());
				done();
			});
	});
});