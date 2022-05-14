import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const NewArticle = () => {
	const titleRef = useRef();
	const descriptionRef = useRef();
	const markdownRef = useRef();

	const navigate = useNavigate();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		axios
			.post(`${process.env.REACT_APP_PORT}/articles/new`, {
				title: titleRef.current.value,
				description: descriptionRef.current.value,
				markdown: markdownRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					navigate(`/show/${res.data._id}`);
				}
			})
			.catch((error) => {
				console.log(error);
				navigate("/");
			});
	};

	return (
		<Container>
			<h1 className="my-4">New Article</h1>
			<Form method="POST" onSubmit={onSubmitHandler}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						required
						type="text"
						name="title"
						ref={titleRef}
					></Form.Control>
				</Form.Group>
				<Form.Group className="mt-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						name="description"
						ref={descriptionRef}
					></Form.Control>
				</Form.Group>
				<Form.Group className="mt-3">
					<Form.Label>Markdown</Form.Label>
					<Form.Control
						required
						as="textarea"
						name="markdown"
						ref={markdownRef}
					></Form.Control>
				</Form.Group>

				<Button href="/" variant="secondary" className="mt-3 mx-1">
					Cancel
				</Button>
				<Button type="submit" variant="primary" className="mt-3 mx-1">
					Save
				</Button>
			</Form>
		</Container>
	);
};

export default NewArticle;
