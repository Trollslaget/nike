import React from "react";
import Button from "../Button/Button";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ product, className, onAdd }) => {
	const onAddHandler = () => {
		onAdd(product);
	};

	return (
		// <Link to={`/product/${product.itemId}`}>
		<div className={"product " + className}>
			<img
				className={"img"}
				src={
					product.itemImage
						? product?.itemImage[0]
						: "https://external-preview.redd.it/PoaOLIx34tOSvAhu0W9TvnpY9rJ0JtzLETWJx0JBBY8.jpg?auto=webp&s=f920ebc44886df9dd35c696a30056b21b9003338"
				}
			/>
			<div className={"title"}>{product?.itemText}</div>
			<span className={"price"}>
				от <b>{product.itemPrice * 155} ₽</b>
			</span>
			{/* <div className={"title"}>{product?.itemText}</div>
			<div className={"description"}>{product.itemDescription}</div>
			<div className='collection'>{product.isCollection ? "да" : "нет"}</div>
			<div className='id'>{product.itemId}</div>
			<div className={"price"}>
				<span>
					Стоимость: <b>{product.itemPrice}</b>
				</span>
			</div>
			<Button className={"add-btn"} onClick={onAddHandler}>
				Добавить в корзину
			</Button> */}
		</div>
		//  </Link>
	);
};

export default ProductItem;
