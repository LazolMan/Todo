import React, { useState, useEffect } from "react";
import axios from "axios";

import Badge from "../Badge/";

import CloseIcon from "../../assets/icons/close.svg";

const Popup = ({ colors, onAdd, setVisiblePopup }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setSelectedColor(colors[0].id);
    setInputValue("");
    setVisiblePopup(false);
  };

  const addItem = () => {
    if (!inputValue) return;

    setIsLoading(true);

    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-list__popup popup">
      <img
        onClick={onClose}
        src={CloseIcon}
        alt="Close Icon"
        className="add-list__popup-close"
      />
      <input
        className="field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="add-list__colors">
        {colors.map((color) => (
          <Badge
            onClick={() => setSelectedColor(color.id)}
            key={color.id}
            color={color.name}
            className={selectedColor === color.id && "active"}
          />
        ))}
      </div>

      <button onClick={addItem} className="button add-list__button">
        {isLoading ? "Загрузка..." : "Добавить"}
      </button>
    </div>
  );
};
export default Popup;
