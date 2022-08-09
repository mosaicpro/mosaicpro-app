import React, { useState, useEffect } from "react";
import { isMobile, isMobileOnly, isTablet } from "react-device-detect";
import Banner from "../Elements/Banner";
import axios from "axios";
import ReadMoreLinkToPage from "../Elements/ReadMoreLinktoPage";
import WorkIndexCard from "../Elements/WorkIndexCard";

function WorkIndexScreen({ setSelect, setNavbar }) {
  const classList =
    "d-flex justify-content-center " + (isMobileOnly ? "w-100 m-auto" : "");
  const classListCard = isMobileOnly
    ? "m-3 rounded-0 d-flex border-top border-white pt-3 mt-3 "
    : "mt-3 mb-3 rounded-0 d-flex justify-content-between border-1 border p-4 border-white";
  const classListCardLayout =
    "d-flex justify-content-between " + (isMobileOnly ? "" : "p-0");
  const classListTitle =
    "avalon fw-bold text-light ps-3 " + (isMobileOnly ? "h6 mb-3" : "h4 mb-0 ");
  const classListText = "h6 fw-normal lh-xl text-light ";
  const classListImage =
    "rounded-0 " + (isMobileOnly ? "p-3" : "pb-2 pe-2 ml-3");
  const imageWidth = "125px";
  const imageHeight = "125px";
  const cardWidthClass = isMobileOnly ? "w-100" : isTablet ? "w-75" : "w-50";

  const background = isMobileOnly
    ? "../static/images/work_mobile.jpg"
    : "../static/images/work_banner.jpg";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setNavbar(true);
    setSelect(4);
    async function fetchProjects() {
      const { data } = await axios.get("/api/projects");
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="navbar-spacer">&nbsp;</div>
      <Banner
        background={background}
        width="100vw"
        height={isMobile ? "60vh" : "80vh"}
        opacity="100%"
        layerColor="rgba(256,256,256,0.1)"
      >
        <div className="ms-3 border-3 border-start text-light pt-5 ps-3 fw-bold avalon h2">
          work
        </div>
      </Banner>
      <div className="w-100 min-vh-100 bg-charcoal">
        {projects.map((project) => (
          <WorkIndexCard
            classList={classList}
            classListCard={classListCard}
            classListCardLayout={classListCardLayout}
            cardTitle={project.title}
            classListTitle={classListTitle}
            classListText={classListText}
            source={project.image}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            classListImage={classListImage}
            createdAt={project.createdAt}
            cardWidthClass={cardWidthClass}
            key={project._id}
          >
            <ReadMoreLinkToPage charShow={255} to={`/work/${project._id}`}>
              {project.description}
            </ReadMoreLinkToPage>
          </WorkIndexCard>
        ))}
      </div>
    </div>
  );
}

export default WorkIndexScreen;
