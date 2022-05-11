import React, { useState, useEffect } from "react";
import { Container, Button, Spinner, ToastContainer, Toast } from "react-bootstrap";
import axios from "axios";

import ArticleCard from "./ArticleCard";

const Articles = () => {
	const [articles, setArticles] = useState();
	const [loading, setLoading] = useState(true);

	const [showToast, setShowToast] = useState(false);
	const toggleToast = () => setShowToast(!showToast);

	const fetchData = () => {
		setLoading(true);

		axios
			.get("http://localhost:8000/articles")
			.then((res) => {
				if (res.status === 200) {
					setArticles(res.data);
					setLoading(false);
					toggleToast();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		setLoading(true);
		const controller = new AbortController();

		axios
			.get("http://localhost:8000/articles", {
				signal: controller.signal,
			})
			.then((res) => {
				if (res.status === 200) {
					setArticles(res.data);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<>
			<ToastContainer
				style={{
					position: "fixed",
					right: "4px",
					top: "12px",
					zIndex: "10",
					opacity: "95%"
				}}
			>
				<Toast show={showToast} onClose={toggleToast}>
					<Toast.Header>
						<strong className="me-auto">The article is deleted</strong>
					</Toast.Header>
				</Toast>
			</ToastContainer>
			<Container>
				<h1 className="my-4">Blog Articles</h1>
				<Button href="new" variant="success">
					New Article
				</Button>
				{loading ? (
					<div className="d-flex justify-content-center align-items-center">
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</div>
				) : (
					articles.map((article) => (
						<ArticleCard
							key={article._id}
							article={article}
							fetchData={fetchData}
						/>
					))
				)}
			</Container>
		</>
	);
};

export default Articles;
