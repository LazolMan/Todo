import React from "react";

import ListItem from "../ListItem";

import "./List.scss";

const List = ({
  items,
  onClick,
  isRemovable,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          activeItem={activeItem}
          onClickItem={onClickItem}
          onRemove={onRemove}
          isRemovable={isRemovable}
        />
      ))}
    </ul>
  );
};

export default List;
