import React, { useContext, useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import { ProductContext } from "../../helpers/ProductContext";
import { getFirebaseData } from "../../helpers/Firebase";
import { SearchPanel } from "../SearchPanel/SearchPanel";
import { useDebounce } from "../../hooks/useDedounce";

const firebaseConfig = {
	apiKey: "AIzaSyA4Hs1Sui1k-QA2LLkzMTGeMD03kUhrixw",
	authDomain: "nike-parser.firebaseapp.com",
	databaseURL:
		"https://nike-parser-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "nike-parser",
	storageBucket: "nike-parser.appspot.com",
	messagingSenderId: "265110176866",
	appId: "1:265110176866:web:937fac1ad9aa3287827d3b",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db, "items");

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return (acc += item.price);
	}, 0);
};
const getUniqueObjects = (inputArray) => {
	const isUnique = (arr, newObj) => {
		return arr.every((obj) => obj.itemText !== newObj.itemText);
	};

	const outputArray = inputArray.reduce((acc, cur) => {
		if (Array.isArray(cur)) {
			cur.forEach((obj) => {
				if (isUnique(acc, obj)) {
					acc.push(obj);
				}
			});
		} else if (isUnique(acc, cur)) {
			acc.push(cur);
		}
		return acc;
	}, []);

	return outputArray;
};
const ProductList = () => {
	const [nikes, setNikes] = useState();
	const { products, updateProducts } = useContext(ProductContext);
	const [addedItems, setAddedItems] = useState([]);
	const { tg, queryId } = useTelegram();
	const [name, setName] = useState("");
	const debouncedName = useDebounce(name);
	const handleNameChange = useCallback((newName) => {
		setName(newName);
	});
	const handleFilterChange = useCallback((newFilter) => {
		if (newFilter === "Сначала дешевые") { // енам или другой способ оптимизировать этот костыль
			const sortedData = nikes.slice().sort((a, b) => +a.itemPrice - +b.itemPrice);
			setNikes(sortedData)
			console.log(nikes[0].itemPrice);
		}
		if (newFilter === "Сначала дорогие") {
			const sortedData = nikes.slice().sort((a, b) => +b.itemPrice - +a.itemPrice);
			setNikes(sortedData)
			console.log(nikes[0].itemPrice);
		}
	});
	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		};
		fetch("http://85.119.146.179:8000/web-data", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}, [addedItems]);
	useEffect(() => {
		if (debouncedName.length > 1) {
			const SearchedNikes = products.filter((nike) =>
				nike.itemText.toLowerCase().includes(debouncedName.toLowerCase())
			);
			console.log(SearchedNikes);

			setNikes(SearchedNikes);
		} else {
			setNikes(products);
		}
	}, [debouncedName]);
	useEffect(() => {
		async function fetchData() {
			try {
				getFirebaseData().then((data) => {
					console.log(data);
					setNikes(data);
					updateProducts(data);
				});
			} catch (error) {
				console.error("Ошибка при получении данных ", error);
			}
		}
		if (products.length === 0 || products.length == undefined) {
			console.log("запрос", products);
			fetchData();
		} else {
			setNikes(products);
			console.log("нет запроса", products.length);
		}
	}, []);
	useEffect(() => {
		tg.onEvent("mainButtonClicked", onSendData);
		return () => {
			tg.offEvent("mainButtonClicked", onSendData);
		};
	}, [onSendData]);

	const onAdd = (product) => {
		console.log("добавили хуйню");
	};

	return (
		<div>
			<SearchPanel
				label='поиск'
				value={name}
				onChangeSearch={handleNameChange}
				onChangeFilter={handleFilterChange}
			/>
			<div className={"list"}>
				{nikes?.map((item) => (
					<Link
						key={item.itemId}
						className='product-link'
						to={`/product/${item.itemId}`}
					>
						<ProductItem
							key={item.itemId}
							product={item}
							onAdd={onAdd}
							className={"item"}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ProductList;
