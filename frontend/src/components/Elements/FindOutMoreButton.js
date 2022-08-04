import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Jump from "react-reveal/Jump";
import { isMobileOnly } from "react-device-detect";
import { Button } from "react-bootstrap";


function FindOutMoreButton() {
  return (
    <div>
      <Jump delay={1100}>
        <div>
          <Button
            className={
              "mb-3 mt-3 bg-primary text-light btn rounded " +
              (isMobileOnly && "w-80")
            }
          >
            <span className="h6 fw-bold avalon">find out more</span>
            <span className="h6 ms-2">
              <FaArrowRight />
            </span>
          </Button>
        </div>
      </Jump>
    </div>
  );
}

export default FindOutMoreButton;
