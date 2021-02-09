import React, { useState, useEffect } from "react";
import axios from "axios";

import "./TaskList.scss";

import editIcon from "../../assets/icons/edit.svg";

import NewTask from "../NewTask/";
import TaskItem from "../TaskItem";

const TaskList = ({
  list,
  onEditTitle,
  onAddTask,
  onEditTask,
  onRemoveTask,
  onCompleteTask,
}) => {
  const [title, setTitle] = useState(list.name);

  useEffect(() => {
    setTitle(list.name);
  }, [list]);

  const onSubmitTitle = (event) => {
    event.preventDefault();

    if (title) {
      onEditTitle(list.id, title);

      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: title,
        })
        .catch(() => {
          alert("Не удалось изменить название списка");
        });
    }
  };

  return (
    <div className="tasks">
      <form className="tasks__title-box" onSubmit={onSubmitTitle}>
        <input
          className="tasks__title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={{ color: list.color.hex }}
          onBlur={onSubmitTitle}
        />
        <img className="tasks__edit-icon" src={editIcon} alt="Edit icon" />
      </form>

      <div className="tasks__list">
        {list.tasks &&
          list.tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              listId={list.id}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
            />
          ))}

        <NewTask key={list.id} onAddTask={onAddTask} list={list} />
      </div>
    </div>
  );
};

export default TaskList;
