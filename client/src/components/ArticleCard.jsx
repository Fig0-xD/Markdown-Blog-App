import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";

const ArticleCard = ({ article, fetchData }) => {
	const navigate = useNavigate();

	const onSubmitHandler = (event) => {
		event.preventDefault();
		axios
			.post(`${process.env.REACT_APP_PORT}/articles/${article._id}?_method=DELETE`)
			.then((res) => {
				if (res.status === 200) {
					console.log("Successful deletion");
					// re-rendering
					fetchData && fetchData();
				}
			})
			.catch((error) => {
				console.log(error);
				navigate("/");
			});
	};

	return (
		<Card className="mt-4">
			<Card.Body>
				<Card.Title>{article.title}</Card.Title>
				<Card.Subtitle className="text-muted mb-2">
					{new Date(article.createdAt).toLocaleDateString()}
				</Card.Subtitle>
				<Card.Text className="mb-2">{article.description}</Card.Text>
				<Button
					href={`/show/${article._id}`}
					variant="primary"
					className="mx-1"
				>
					Read More
				</Button>
				<Button
					href={`/edit/${article._id}`}
					variant="info"
					className="mx-1"
					style={{ color: "white" }}
				>
					Edit
				</Button>
				<Form method="POST" onSubmit={onSubmitHandler} className="d-inline">
					<Button type="submit" variant="danger" className="mx-1">
						Delete
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default ArticleCard;
