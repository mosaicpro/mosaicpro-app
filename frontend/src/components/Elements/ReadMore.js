import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div>
      <p className="text">{isReadMore ? text.slice(0, 55) + "..." : text}</p>
      <p onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "read more" : " show less"}
      </p>
    </div>
  );
};

export default ReadMore;
