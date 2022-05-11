const mongoose = require("mongoose");
const marked = require("marked");

const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	description: {
		type: String,
	},
	markdown: {
		type: String,
		required: true,
	},
	sanitizedHtml: {
		type: String,
		required: true,
	},
});

articleSchema.pre("validate", function (next) {
	if (this.markdown) {
		this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
	}

	next();
});

module.exports = mongoose.model("Article", articleSchema);
