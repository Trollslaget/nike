import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import {BrowserRouter} from "react-router-dom";
import { ProductProvider } from "./helpers/ProductContext";
import {Link, Route, RouterProvider, Routes, createBrowserRouter} from 'react-router-dom'
// import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Header from "./components/Header/Header";
// import './fonts/SanFrancisco/SF-Pro-Display-Bold.otf' 

// import './fonts/SanFrancisco/SF-Pro-Display-Black.otf' 
// import './fonts/SanFrancisco/SF-Pro-Display-Regular.otf' 
import './fonts/SanFrancisco/SF-Pro-Display-Semibold.otf'
console.log('render');
// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <ProductList />,
//     },
//     {
//       path: "product/:productId",
//       element: <ProductDetail/>,
    
//     },
  
//   ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ProductProvider>
		<App />
    {/* <RouterProvider router={router} ></RouterProvider> */}
	</ProductProvider>
);
