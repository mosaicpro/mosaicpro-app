import React from "react";
import { Row, Col } from "react-bootstrap";
import WorkCard from "../../Elements/WorkCard";
import { isMobile, isMobileOnly, isTablet,  } from "react-device-detect";
import { Link } from "react-router-dom";
import VideoCard from "../../Elements/VideoCard";


function WorkFrame({ setSelect }) {
  const vid1 = "./static/videos/hills.mp4";
  const bgImage1 = "./static/images/surgery.jpg";
  const bgImage2 = "./static/images/hannah.png";
  const bgImage3 = "./static/images/jewellery.jpg";
  const rowClass = "d-flex justify-content-center m-auto mt-3";
  const secondColClass = isMobile ? "mb-3 w-85" : "pe-2 ";

  const workCardStyling = {
    backgroundLayerColour: "rgba(108,61,215,0.5)",
    height: "50vh",
    workTitleClass: "text-light",
    workCardClassList:
      "child border-1 border-light d-flex w-100 h-100 position-relative align-items-center",
  };

  return (
    <div className="min-vh-75 pb-3 bg-charcoal">
      <div className="screen-spacer">&nbsp;</div>
      <h3 className="h3 text-light ps-3 ms-4 avalon border-light border-start border-3">
        work
      </h3>
      <div className={!isMobile && "w-85 m-auto"}>
        <Row className={rowClass}>
          <Col md={12} className="w-85">
            <WorkCard
              title="Hannah Lebrecht"
              bgImage={bgImage2}
              styling={workCardStyling}
              to='work/'
            />
          </Col>
        </Row>
        {/* <Row className={rowClass}>
          <Col className={secondColClass} md={3}>
            {isMobile ? (
              <WorkCard
                title="Lazy Production"
                bgImage={bgImage2}
                styling={workCardStyling}
              />
            ) : (
              <VideoCard video={vid1} title="lazy productions" />
            )}
          </Col>
          <Col className={secondColClass} md={9}>
            <WorkCard
              title="Jewellery By Jane"
              bgImage={bgImage3}
              styling={workCardStyling}
            />
          </Col>
        </Row> */}
        {/* <Row>
          <Col
            className={
              isMobile
                ? "w-100 d-flex justify-content-center"
                : " d-flex  justify-content-start ms-2"
            }
          >
            <Link
              onClick={() => setSelect(4)}
              className={
                "mt-4 mb-3 bg-primary text-light btn rounded h5 " +
                (isMobileOnly ? "w-85" : isTablet ? 'w-50' : '')
              }
              to={"/work"}
            >
              More Projects
            </Link>
          </Col>
        </Row> */}
      </div>
    </div>
  );
}

export default WorkFrame;
