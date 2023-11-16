import React, { useContext, useState } from "react";
import "./SearchPanel.css";
import { ProductContext } from "../../helpers/ProductContext";
import FilterBtn from "../FilterBtn/FilterBtn";
export const SearchPanel = ({
	label,
	value,
	onChangeSearch,
	onChangeFilter,
}) => {
	return (
		<div className='search-panel'>
			{/* <label>{label}</label> */}
			<input
				className='search-input'
				type='text'
				value={value}
				placeholder={label}
				onChange={(e) => onChangeSearch(e.target.value)}
			/>
			<FilterBtn
				value={"Сортировка"}
				options={["Сначала дешевые", "Сначала дорогие"]}
				onChange={(e) => onChangeFilter(e)}
			/>
		</div>
	);
};
