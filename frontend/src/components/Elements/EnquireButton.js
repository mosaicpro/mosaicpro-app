import React from "react";
import { FaEnvelope } from "react-icons/fa";
import RubberBand from "react-reveal/RubberBand";
import { isMobile } from "react-device-detect";

function EnquireButton({ setModalShow }) {
  return (
    <div>
      <RubberBand delay={1700}>
        <button
          style={{
            height: "60px",
            width: "60px",
            position: "fixed",
            right: "0",
            zIndex: "1",
          }}
          className={
            "bg-dark-blue text-light btn rounded-circle bottom-position set-purple" +
            (isMobile ? " me-4" : " mb-10 me-5")
          }
          onClick={() => setModalShow(true)}
        >
          <FaEnvelope className="fa-2x" />
        </button>
      </RubberBand>
    </div>
  );
}

export default EnquireButton;
