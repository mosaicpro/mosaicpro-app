import React from "react";
import BasicCard from "../../Elements/BasicCard";
import { Image } from "react-bootstrap";
import { isMobile, isMobileOnly, isTablet } from "react-device-detect";
import { useMediaQuery } from 'react-responsive'

function AboutFrame() {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })  
  const background = "./static/images/about_laptop_work.jpg";
  const aboutCardStyling = {
    classList:
      "d-flex bg-light rounded " +
      (isMobileOnly
        ? "rounded w-100 m-3 justify-content-center"
        : isTablet & isPortrait
        ? "w-50 mt-5 mb-5"
        : "w-50"),
    classListTitle:
      "border-bottom border-3 border-secondary pb-2  h3 avalon ps-3 pt-2 " +
      (isMobileOnly ? "w-75" : "w-50"),
    classListText: " pb-2 fw-normal",
    classListCard: "mt-4 mb-5",
  };
  return (
    <div>
      <div className="d-block d-md-none w-100">
        <Image
          src="./static/images/hero_page_pattern_mobile.png"
          alt="mosaic pro pattern mobile"
          style={{ maxHeight: "14px", width: "100%" }}
        />
      </div>
      <div
        style={{
          backgroundImage: "url(" + background + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="about-background"
      >
        <BasicCard cardTitle="about us" styling={aboutCardStyling}>
          <h5 className="p fw-normal">
          Mosaic Pro was started to put owners back in control of their web apps. We build flexible solutions that adapt and grow with your organisation’s goals by allowing you to modify content, reach out to new users and analyse the effectiveness of campaigns.
          <br/> <br/>
          Whether you're a creator building up an audience or an established e-commerce site looking to grow, we provide bespoke solutions that will match your needs.
          <br/> <br/><br/>
          So why not get in touch and see what we can do for you.
          </h5>
        </BasicCard>
      </div>
    </div>
  );
}

export default AboutFrame;
