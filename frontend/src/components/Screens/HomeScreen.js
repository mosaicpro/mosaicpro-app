import React, { useEffect } from "react";
import LandingFrame from "../Frames/HomeScreen/LandingFrame";
import AboutFrame from "../Frames/HomeScreen/AboutFrame";
import ServicesFrame from "../Frames/HomeScreen/ServicesFrame";
import BlogFrame from "../Frames/HomeScreen/BlogFrame";
import WorkFrame from "../Frames//HomeScreen/WorkFrame";
import Fade from "react-reveal/Fade";
import EnquireButton from "../Elements/EnquireButton";


function HomeScreen({
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  setModalShow,
  setSelect,
  setNavbar,
}) {
  useEffect(() => setNavbar(true), []);

  return (
    <div>
      <div>
        <EnquireButton setModalShow={setModalShow} />
      </div>

      <div ref={ref1}>
        <LandingFrame/>
      </div>
      <div className="screen-spacer">&nbsp;</div>
      <div ref={ref2}>
        <Fade>
          <AboutFrame />
        </Fade>
      </div>
      <div className="screen-spacer">&nbsp;</div>
      <div ref={ref3}>
        <Fade>
          <ServicesFrame />
        </Fade>
      </div>
      <div className="screen-spacer">&nbsp;</div>
      <div ref={ref4}>
        <Fade>
          <WorkFrame setSelect={setSelect} />
        </Fade>
      </div>
      <div className="screen-spacer">&nbsp;</div>
      <div ref={ref5}>
        <Fade>
          <BlogFrame setSelect={setSelect} />
        </Fade>
      </div>
      <div className="screen-spacer">&nbsp;</div>
    </div>
  );
}

export default HomeScreen;
