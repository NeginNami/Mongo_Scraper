const assert = require("assert");
const Article = require("../model/article");

describe("Creating a record", () => {
	it("Saves an article", (done) => {
		const artcle1 = new Article({
			title: "Title1",
			link: "link1",
			description: "description1"
		});
		artcle1.save()
			.then(() => {
				assert(!artcle1.isNew);
				done();
			});

	});
});