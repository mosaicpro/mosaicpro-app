import React from "react";

function Filter({ filterItem, setItem, menuItems, posts, classListButtons }) {
  return (
    <>
      <div className="d-flex justify-content-center w-100">
        {menuItems.map((Val, id) => {
          return (
            <button
              className={classListButtons}
              style={{ minWidth: "100px" }}
              key={id}
              onClick={() => filterItem(Val)}
            >
              {Val}
            </button>
          );
        })}
        <button
          className={classListButtons}
          style={{ minWidth: "100px" }}
          onClick={() => setItem(posts)}
        >
          all
        </button>
      </div>
    </>
  );
}

export default Filter;
