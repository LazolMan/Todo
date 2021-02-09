import React, { useState } from "react";

import List from "../List";

import Popup from "../Popup/";

import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            icon: (
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="#B4B4B4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="#B4B4B4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Все задачи",
            className: "list__add-button",
          },
        ]}
      />

      {visiblePopup && <Popup colors={colors} onAdd={onAdd} setVisiblePopup={setVisiblePopup}/>}
    </div>
  );
};

export default AddList;
