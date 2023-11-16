import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {
	BrowserRouter,
	Link,
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
} from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

import ProductDetail from "./components/ProductDetail/ProductDetail";
const router = createBrowserRouter([
	{
		path: "/",
		element: <ProductList />,
		children: [
			{
				path: "/",
				element: <Header />,
			},
		],
	},
	{
		path: "product/:productId",
		element: <ProductDetail />,
		//   loader: ({ params }) => {
		//     console.log(params.productId, "xddx");
		//     return params;
		//   },
	},
]);
function App() {
	const { onToggleButton, tg } = useTelegram();

	useEffect(() => {
		tg.ready();
	}, []);

	return (
		<div className='App'>
			<RouterProvider router={router} />
			{/* <Form/> */}
		</div>
	);
}

export default App;
