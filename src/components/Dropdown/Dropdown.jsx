import React, { useEffect, useState } from "react";
import "./Dropdown.css";
function Dropdown({ title, description }) {
	const [isOpen, setIsOpen] = useState(false);
  const [svgCode, setSvgCode] = useState(`
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
  <path d="M0.705384 0.294581C1.09466 -0.0946914 1.72569 -0.0950353 2.11538 0.293813L5.29366 3.46517C5.68401 3.85467 6.31599 3.85467 6.70634 3.46517L9.88462 0.293812C10.2743 -0.0950355 10.9053 -0.0946913 11.2946 0.294581C11.6842 0.684154 11.6842 1.31578 11.2946 1.70535L6.70711 6.29286C6.31658 6.68338 5.68342 6.68338 5.29289 6.29286L0.705384 1.70535C0.315811 1.31578 0.315811 0.684154 0.705384 0.294581Z" fill="#000"/>
  </svg>
`);
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='dropdown'>
			<div className='dropdown-header' onClick={toggleDropdown}>
				{title}
				<div className={`arrow ${isOpen ? "open" : ""}`}>
					{" "}
					<div dangerouslySetInnerHTML={{ __html: svgCode }} />
				</div>
			</div>
			{isOpen && <div className='dropdown-content'>{description}</div>}
		</div>
	);
}

export default Dropdown;
