import React, { useState } from "react";
import { Link } from "react-router-dom";

function WorkCard({ title, styling, bgImage, to }) {
  const [showLayer, setShowLayer] = useState(false);

  return (
    <div
      style={{
        height: styling.height,
        overflow: "hidden",
      }}
      className="parent w-100"
    >
      <div
        onMouseEnter={() => setShowLayer(true)}
        onMouseLeave={() => setShowLayer(false)}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={styling.workCardClassList}
      >
        {showLayer ? (
        <Link className="text-decoration-none" to={to}>
          <div
            className="position-absolute d-flex w-100 justify-content-center align-items-center avalon top-0 start-0"
            style={{
              height: styling.height,
              backgroundColor: styling.backgroundLayerColour,
            }}
          >
              <h4 className={styling.workTitleClass}>{title}</h4>
          </div>
        </Link>
        ) :           <div
        className="position-absolute d-flex flex-column w-100 justify-content-between align-items-center avalon top-0 start-0"
        style={{
          height: "50vh",
          backgroundColor: "rgba(108,61,215,0.3)",

        }}
        >
              <div>
                &nbsp;
              </div> 
              <div>
              <h4 className={styling.workTitleClass}>{title}</h4>
              </div>
              <div className="w-100 d-flex justify-content-end mb-3 me-3">
                <div
                  style={{ minWidth: "60px", maxWidth:"120px", maxHeight:'40px' }}
                  className="text-center border border-light text-light border-1 text-sm rounded p-1 mt-5 me-3">
                  Performance
              </div>
              <div
                  style={{ minWidth: "60px", maxWidth:"120px" }}
                  className="text-center border border-light text-light border-1 text-sm rounded p-1 mt-5 me-3">
                  Portfolio
              </div>
            </div>
      </div>}
      </div>
    </div>
  );
}

export default WorkCard;
