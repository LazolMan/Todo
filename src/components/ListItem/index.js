import React from "react";

import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge/";

import "./ListItem.scss";

import RemoveIcon from "../../assets/icons/remove.svg";

const ListItem = ({ item, activeItem, onClickItem, onRemove, isRemovable }) => {
  const removeItem = (item) => {
    if (window.confirm("Удалить папку?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <li
      className={classNames("list-item", item.className, {
        active: item.active
          ? item.active
          : activeItem && activeItem.id === item.id,
      })}
      onClick={onClickItem ? () => onClickItem(item) : null}
    >
      <i className="list-item__badge-icon">
        {item.icon ? item.icon : <Badge color={item.color.name} />}
      </i>
      <span className="list-item__text">
        {item.name}
        {item.tasks && ` (${item.tasks.length})`}
      </span>
      {isRemovable && (
        <img
          className="list-item__remove-icon"
          onClick={() => removeItem(item)}
          src={RemoveIcon}
          alt="Remove icon"
        />
      )}
    </li>
  );
};

export default ListItem;
