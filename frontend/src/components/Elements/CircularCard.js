import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { isTablet } from "react-device-detect";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive'


function CircularCard({ size, cardTitle, children, classList }) {
  const [flipCard, setFlipCard] = useState(false);
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  const styles = {
    innerCard: {
      width: size,
      height: size,
      opacity: 0.9,
      transform: flipCard ? "rotateY(180deg)" : "",
    },
    flip: {
      transform: flipCard ? "rotateY(180deg)" : "",
    },
  };

  const clickHandler = () => {
    setFlipCard(!flipCard);
  };

  return (
    <div className="flip-box d-flex justify-content-center" style={styles.flip}>
      <Card
        className={(isPortrait & isTablet ? 'flip-box-inner '+ classList : 'rounded-circle flip-box-inner '+ classList) }
        style={styles.innerCard}
      >
        <Card.Body
          className="flex-column justify-content-between flip-box-front"
          style={{ display: flipCard ? "none" : "flex" }}
        >
          <div className="p-3"> &nbsp;</div>
          <Card.Title>
            <h4 className="text-light mt-3 m-auto text-center">{cardTitle}</h4>
          </Card.Title>
          <Card.Text className="h5 p-0 fw-bold  m-auto text-center">
            <button
              onClick={clickHandler}
              className="text-light bg-transparent border-0"
            >
              <FaArrowRight className="fa-lg" />
            </button>
          </Card.Text>
        </Card.Body>
        <div
          className={"w-100 m-auto mt-5"}
          style={{ display: flipCard ? "block" : "none" }}
        >
          <div style={{ fontSize: "1rem" }} className={"w-85 text-end me-3"}>
            <button
              onClick={clickHandler}
              className="text-light bg-transparent border-0 pb-0"
            >
              <FaTimes className="fa-lg"/>
            </button>
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
}

export default CircularCard;
