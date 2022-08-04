import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Fade from "react-reveal/Fade";
import { isMobile, isMobileOnly, isTablet } from "react-device-detect";
import React from "react";

function BlogFrame({ setSelect }) {
  const background = isMobile
    ? "./static/images/poster_purple.png"
    : "./static/images/apartments_purple.jpg";

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(" + background + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: "100%",
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        {isMobile || isTablet ? (
          <div className="w-100 d-flex flex-column align-items-center justify-content-start">
            <div
              style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.1)",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></div>
            <div className="d-flex justify-content-start w-100 ms-5">
              <h3 className="h3 mt-3 text-light avalon ps-3 border-3 border-light border-start">
                Blog
              </h3>
            </div>
            <div></div>
            <Link
              to={"/blog"}
              style={{ top: "25%" }}
              className={
                "position-absolute mb-3 bg-primary text-light btn rounded h5 " +
                (isMobileOnly ? "w-85" : isTablet ? 'w-50' : '')
              }
            >
              Read More
            </Link>
          </div>
        ) : (
          <div
            style={{
              bottom: "13%",
              right: "25%",
            }}
            className="position-absolute"
          >
            <Link
              style={{ transform: "rotate(-3deg)" }}
              onClick={() => setSelect(5)}
              to={"/blog"}
              className="set-white text-dark h1 d-flex"
            >
              <Fade>
                <FaChevronRight className="fa-2x" />
              </Fade>
              <Fade delay={300}>
                <FaChevronRight className="fa-2x" />
              </Fade>
              <Fade delay={600}>
                <FaChevronRight className="fa-2x" />
              </Fade>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogFrame;
