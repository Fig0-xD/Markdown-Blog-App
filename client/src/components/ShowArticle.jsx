import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const ShowArticle = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [article, setArticle] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();

		axios
			.get(`${process.env.PORT}/articles/${params.id}`, {
				signal: controller.signal,
			})
			.then((res) => {
				if (res.status === 200) {
					setArticle(res.data);
					setLoading(false);
				}
				if (res.status === 204) {
					console.log("No content available");
					navigate("/");
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			controller.abort();
		};
	}, [params, navigate]);

	useEffect(() => {
		if (!article) return;
		const parser = new DOMParser();
		const doc = parser.parseFromString(article.sanitizedHtml, "text/html");

		const markdownDiv = document.getElementById("markdown");
		markdownDiv.appendChild(doc.body);
	}, [article]);

	return (
		!loading && (
			<Container>
				<h1 className="my-1">{article.title}</h1>
				<div className="text-muted mb-2">
					{new Date(article.createdAt).toLocaleDateString()}
				</div>
				<div
					style={{
						margin: "0",
						padding: "0",
						borderTop: "2px solid #798189",
						width: "100%",
						height: "0",
					}}
				></div>
				<div className="my-2">{article.description}</div>
				<div
					style={{
						margin: "0",
						padding: "0",
						borderTop: "2px solid black",
						width: "100%",
						height: "0",
					}}
				></div>
				<div id="markdown" className="my-2"></div>
				<Button href="/" variant="secondary" className="mt-2 mx-1">
					All Articles
				</Button>
				<Button
					href={`/edit/${article._id}`}
					variant="info"
					className="mt-2 mx-1"
					style={{ color: "white" }}
				>
					Edit
				</Button>
			</Container>
		)
	);
};

export default ShowArticle;
