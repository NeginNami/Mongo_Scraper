const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ArticleSchema = new schema({
	title: String,
	link: String,
	description: String
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;