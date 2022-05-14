import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const EditArticle = () => {
	const params = useParams();
	const navigate = useNavigate();

	const [titleValue, setTitleValue] = useState();
	const [descriptionValue, setDescriptionValue] = useState();
	const [markdownValue, setMarkdownValue] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const controller = new AbortController();
		axios
			.get(`${process.env.REACT_APP_PORT}/articles/${params.id}`, {
				signal: controller.signal,
			})
			.then((res) => {
				if (res.status === 204) {
					console.log("No content available");
					navigate("/");
				}
				if (res.status === 200) {
					setTitleValue(res.data.title);
					setDescriptionValue(res.data.description);
					setMarkdownValue(res.data.markdown);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
				if (error.code !== "ERR_CANCELED") navigate("/");
			});

		return () => {
			controller.abort();
		};
	}, [params, navigate]);

	const titleRef = useRef();
	const descriptionRef = useRef();
	const markdownRef = useRef();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		axios
			.post(`${process.env.REACT_APP_PORT}/articles/${params.id}?_method=PATCH`, {
				title: titleRef.current.value,
				description: descriptionRef.current.value,
				markdown: markdownRef.current.value,
			})
			.then((res) => {
				if (res.status === 204) {
					console.log("No content available");
					navigate("/");
				}
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
		!loading && (
			<Container>
				<h1 className="my-4">Edit Article</h1>
				<Form method="POST" onSubmit={onSubmitHandler}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							required
							type="text"
							name="title"
							ref={titleRef}
							defaultValue={titleValue}
						></Form.Control>
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							name="description"
							ref={descriptionRef}
							defaultValue={descriptionValue}
						></Form.Control>
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Label>Markdown</Form.Label>
						<Form.Control
							required
							as="textarea"
							name="markdown"
							ref={markdownRef}
							defaultValue={markdownValue}
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
		)
	);
};

export default EditArticle;
