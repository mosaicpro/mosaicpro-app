import React from "react";
import { Image } from "react-bootstrap";
import { isMobile, isMobileOnly, isTablet } from "react-device-detect";
import Fade from "react-reveal/Fade";
import { useMediaQuery } from 'react-responsive'


function LandingFrame({aboutRef}) {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const background = isMobileOnly || isPortrait ? "/static/images/mobile_background.png" : "";


  return (
    <div>
      <div className="navbar-spacer">&nbsp;</div>
      <div
        className={
          "d-flex justify-content-around min-vh-75 " + (isMobile ? "p-3" : "")
        }
      >

        {(!isMobile || isTablet) && (
          <Fade delay={500} left>
            <div className="d-flex flex-column d-none d-lg-block">
              <Image
                src="./static/images/left_corner.png"
                alt="left corner"
                style={{ height: "90vh" }}
              />
            </div>
          </Fade>
        )}

        <Fade left>
          <div
            style={{
              width: "100%",
              backgroundImage: "url(" + background + ")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1 className="mt-0 charcoal ps-5 ms-5 hero-text">Mosaic Pro</h1>
            <h1 className="ms-5 mb-3 ps-5 pb-4 fw-normal charcoal hero-text lh-1">
              we tell
              <br />
              the
              <br />
              world
              <br />
              your<br />
              <span className="text-secondary">
                <i style={{ color: "#2dc5f6" }}>story.</i>
              </span>
            </h1>
            {/* <div className="ms-5 ps-5">
              <FindOutMoreButton  />
            </div> */}
          </div>
        </Fade>
        {(!isMobile || isTablet) && (
          <Fade delay={500} right>
            <div className="d-none d-md-none d-lg-block">
              <Image
                className="vh-100"
                src="./static/images/hero_page_pattern.png"
                alt="mosaic pro pattern"
              />
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}

export default LandingFrame;
