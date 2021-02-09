import React, { useState } from "react";
import axios from "axios";

import "./NewTask.scss";

import addIcon from "../../assets/icons/add.svg";

const AddNewTask = ({ onAddTask, list }) => {
  const [inputValue, setInputValue] = useState("");
  const [visibleBox, setVisibleBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibleBox = () => {
    setVisibleBox(!visibleBox);
    setInputValue("");
  };

  const addTask = () => {
    if (inputValue) {
      const obj = {
        listId: list.id,
        text: inputValue,
        completed: false,
      };

      setIsLoading(true);

      axios
        .post("http://localhost:3001/tasks", obj)
        .then(({ data }) => {
          onAddTask(list.id, data);
        })
        .catch(() => alert("Ошибка при добавлении"))
        .finally(() => {
          setIsLoading(false);
          toggleVisibleBox();
        });
    }
  };

  return (
    <div className="tasks__new-task new-task">
      {!visibleBox && (
        <div className="new-task__text">
          <img className="new-task__icon" src={addIcon} alt="Add icon" />
          <span onClick={toggleVisibleBox} className="new-task__title">
            Новая задача
          </span>
        </div>
      )}

      {visibleBox && (
        <div className="new-task__box">
          <input
            className="new-task__input field"
            value={inputValue}
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={isLoading}
            onClick={addTask}
            className="new-task__button-green button"
          >
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button
            onClick={toggleVisibleBox}
            className="new-task__button-grey button_grey button "
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNewTask;
