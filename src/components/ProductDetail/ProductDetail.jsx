import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../helpers/ProductContext";
import { getFirebaseData } from "../../helpers/Firebase";
import "./ProductDetail.css";
// import SizesSelect from "../SizesSelect/SizesSelect";
import ProductSelect from "../ProductSelect/ProductSelect";
import SizesSelect from "../SizesSelect/SizesSelect";
import Dropdown from "../Dropdown/Dropdown";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTelegram } from "../../hooks/useTelegram";
const ProductDetail = () => {
	const [product, setProduct] = useState();
	const { productId } = useParams(); // Получаем идентификатор товара из URL
	const navigate = useNavigate();
	const { products } = useContext(ProductContext);
	const [selectedOption, setSelectedOption] = useState("");
	const { tg } = useTelegram();
	const onSendData = useCallback(() => {
		const data = product;
		tg.sendData(JSON.stringify(data));
	}, [product]);
	const buttonClickHadler = () => {
		tg.sendData(
			JSON.stringify({
				itemText: product.itemText + " " + product.itemDescription,
				itemSize: selectedOption,
				itemSKU: product.itemSKU,
				itemPrice: product.itemPrice * 150,
				itemImage: product.itemImage[0],
			})
		);
		console.log({
			size: selectedOption,
			price: product.itemPrice,
			name: product.itemText + " " + product.itemDescription,
		});
	};
	const handleSelectChange = (option) => {
		setSelectedOption(option);
	};
	console.log("render product detail");
	useEffect(() => {
		const getProductById = (productId) => {
			return products.find((product) => product.itemId === +productId);
		};
		const productData = getProductById(productId);

		if (!productData) {
			async function fetchData(productId) {
				try {
					getFirebaseData(+productId).then((data) => {
						console.log(data);
						setProduct(data);
					});
				} catch (error) {
					console.error("Ошибка при получении данных ", error);
				}
			}
			fetchData(productId);
		} else {
			setProduct(productData);
		}
		// tg.onEvent("mainButtonClicked", onSendData);
		// tg.MainButton.show();
		// tg.MainButton.setParams({
		// 	text: "Отправить данные",
		// });
	}, []);
	console.log(product);
	return (
		<div>
			{product ? (
				<div className='product-container'>
					<div
						onClick={() => {
							navigate(-1);
						}}
						className='back-btn'
					>
						&#8592;
					</div>

					<Carousel
						showArrows={false} // Опционально: добавьте стрелки для навигации
						showThumbs={false} // Опционально: отключите миниатюры (если не нужны)
						dynamicHeight={false} // Опционально: включите автоматическую высоту
					>
						{product.itemImage?.map((image, index) => (
							<div key={index}>
								<img src={image} alt={`Image ${index}`} />
							</div>
						))}
					</Carousel>
					<div className={"detail-title"}>{product?.itemText}</div>
					<div className={"detail-description"}>{product.itemDescription}</div>
					<div className='detail-sku'>SKU: {product.itemSKU}</div>
					<div className='sizes-container'>
						{
							<SizesSelect
								options={product.itemAvailable}
								onSelectChange={handleSelectChange}
								releaseDate={product.itemReleaseDate}
							/>
						}
					</div>
					<span className={"detail-price"}>
						Стоимость: от <b>{product.itemPrice * 150} ₽</b>
					</span>

					<button
						disabled={selectedOption ? false : true}
						onClick={buttonClickHadler}
						className={`Buy-Btn ${selectedOption ? "" : "disabled-btn"}`}
					>
						Оформить заказ
					</button>
					<Dropdown
						title='Как выбрать размер'
						description={`
					Основные размеры на нашем сайте - это EU (Европейский).
					
					Примечание:
					EU - на 1 деление обозначается больше русского. Например, если у вас русский 42, значит EU - 43.
					`}
					/>
					<Dropdown
						title='Оригинальность товара'
						description={`Мы заботимся о вашем стиле и уверены, что вы заслуживаете только лучшее. Мы предоставляем вам редкие кроссовки Nike с гарантией подлинности.`}
					/>
					<Dropdown
						title='Способ доставки'
						description={`
					Доставка до Москвы включена в стоимость.
					Вы можете забрать свой заказ в Москве, оформить доставку курьером или в пункте самовывоза СДЭК в любом городе России. Обычно доставка по России занимает 3-4 дня и стоит в среднем 350 рублей. Выбрать способ доставки по России можно после оплаты заказа.
					Оплата заказа возможно банковской картой или через СБП.
					`}
					/>
				</div>
			) : (
				<p></p>
			)}
		</div>
	);
};

export default ProductDetail;
