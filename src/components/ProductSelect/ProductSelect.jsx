import React, { useState } from "react";

function ProductSelect({ product }) {
	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedValue(selectedValue);
		onProductChange(selectedValue); // Вызываем функцию родительского компонента
	};

	return (
		<div>
			<label htmlFor='productSelect'>Выберите продукт:</label>
			<select id='productSelect' value={selectedValue} onChange={handleChange}>
				<option value=''>Выберите продукт</option>
				{product.itemAvailable.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</select>
			{selectedValue && <p>Выбран продукт: {selectedValue}</p>}
		</div>
	);
}

export default ProductSelect;
