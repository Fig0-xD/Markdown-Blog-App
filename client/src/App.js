import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Articles from "./components/Articles";
import EditArticle from "./components/EditArticle";
import NewArticle from "./components/NewArticle";
import ShowArticle from "./components/ShowArticle";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Articles />}></Route>
					<Route path="new" element={<NewArticle />}></Route>
					<Route path="edit/:id" element={<EditArticle />}></Route>
					<Route path="show/:id" element={<ShowArticle />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
