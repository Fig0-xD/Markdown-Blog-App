require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(methodOverride("_method"));

const mongodbConnect = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Successfully connected to mongoDB");
	} catch (error) {
		console.log("Couldn't connect to mongoDB");
		console.log(error);
	}
};

mongodbConnect();

const Article = require("./models/article");

app.get("/articles", async (req, res) => {
	try {
		const articles = await Article.find().sort({ createdAt: "desc" });
		res.status(200).json(articles);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error.message });
	}
});

app.get("/articles/:id", async (req, res) => {
	let article = null;
	try {
		article = await Article.findOne({ _id: req.params.id });
		if (article == null) res.sendStatus(204);

		res.status(200).json(article);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error.message });
	}
});

app.post(
	"/articles/new",
	async (req, res, next) => {
		let article = new Article();
		req.article = article;
		next();
	},
	saveArticle()
);

app.patch(
	"/articles/:id",
	async (req, res, next) => {
		try {
			let article = await Article.findById(req.params.id);
			if (article == null) res.sendStatus(204);

			req.article = article;
			next();

		} catch (error) {
			console.log(error);
			res.status(400).json({ message: error.message });
		}
	},
	saveArticle()
);

app.delete("/articles/:id", async (req, res) => {
	try {
		await Article.findByIdAndDelete(req.params.id);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

function saveArticle() {
	return async (req, res) => {
		let article = req.article;
		article.title = req.body.title;
		article.description = req.body.description;
		article.markdown = req.body.markdown;

		try {
			article = await article.save();
			res.status(200).json(article);
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: error.message });
		}
	};
}

app.listen(process.env.PORT || 8000, () => {
	console.log("Server listening on port 8000");
});
