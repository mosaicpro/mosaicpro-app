import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <div className="w-100 vh-100">
        <div className="navbar-spacer">&nbsp;</div>
        <div className=" pt-3 ps-3">
          <Link
            to={"/"}
            className="text-decoration-none text-primary border-0 text-left"
          >
            {" "}
            back to homepage
          </Link>
        </div>
        <h3 className="w-100 text-center mt-5">PAGE NOT FOUND 404</h3>
      </div>
    </div>
  );
}

export default PageNotFound;
