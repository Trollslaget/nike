import React, { useState } from "react";
import "./FilterBtn.css";
function FilterBtn({ value, options, onChange }) {
	const [isOpen, setIsOpen] = useState(false);
	const [filter, setFilter] = useState(null);
	const handleOptionClick = (optionValue) => {
		onChange(optionValue);
		setIsOpen(false);
		setFilter(optionValue);
	};

	return (
		<div className={`filter-select ${isOpen ? "open" : ""}`}>
			<div
				className={`filter-header ${isOpen ? "open" : ""}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{filter ? filter : value}
			</div>
			<div className={`filter-options ${isOpen ? "open" : ""}`}>
				{options.map((option) => (
					<div
						key={option}
						className='filter-option'
						onClick={() => handleOptionClick(option)}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	);
}

export default FilterBtn;
