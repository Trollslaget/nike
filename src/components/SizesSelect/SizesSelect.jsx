import React, { useState } from "react";
import "./SizesSelect.css";


function SizesSelect({ options, onSelectChange, releaseDate }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelectChange(option);
  };

  return (
    <div className="custom-select">
      <div className="options show"> {/* Показываем все варианты выбора */}
        {options? options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        )) : releaseDate ? <div className="preorder">
          Дата выхода:  {releaseDate} <br />
          Для товара доступен только предзаказ, <br /> обратитесь к менеджеру, чтобы забронировать размер
         
        </div> : <div className="preorder">Для уточнения деталей о товаре, обратитесь к менеджеру</div>}
      </div>
    </div>
  );
}

export default SizesSelect;
