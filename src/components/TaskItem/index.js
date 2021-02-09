import React, { useState } from "react";

import RemoveIcon from "../../assets/icons/remove.svg";

const Task = ({ text, id, completed, listId, onEdit, onRemove, onComplete }) => {
  const [taskText, setTaskText] = useState(text);

  return (
    <div className="tasks__item">
      <div className="tasks__check">
        <input
          className="tasks__checkbox"
          id={`check_${id}`}
          type="checkbox"
          onChange={(e) => onComplete(listId, id, e.target.checked)}
          checked={completed}
        />
        <label className="tasks__label" htmlFor={`check_${id}`}>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
              stroke="#B3B3B3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </div>

      <form className="tasks__form">
        <input
          className="tasks__item-content"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onBlur={() => onEdit(listId, id, taskText)}
        />

        <img
          className="tasks__close-icon"
          src={RemoveIcon}
          alt="Удалить"
          onClick={() => onRemove(listId, id)}
        />
      </form>
    </div>
  );
};

export default Task;
