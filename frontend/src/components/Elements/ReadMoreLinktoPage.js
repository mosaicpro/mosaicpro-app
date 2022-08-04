import React from "react";
import { Link } from "react-router-dom";

const ReadMoreLinkToPage = ({ children, charShow, to }) => {
  const text = children;

  return (
    <div>
      <p className="text">{text.slice(0, charShow) + "..."}</p>
      <Link className="h6" to={to}>
        read more
      </Link>
    </div>
  );
};

export default ReadMoreLinkToPage;
