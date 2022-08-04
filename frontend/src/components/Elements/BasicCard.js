import React from "react";
import { Card } from "react-bootstrap";

function BasicCard({ source, styling, cardTitle, children }) {
  return (
    <div style={{ width: styling.width }} className={styling.classList}>
      <div className={styling.classListCard}>
        <div>
          <Card.Title>
            <p className={styling.classListTitle}>{cardTitle}</p>
          </Card.Title>
          <div className={styling.classListCardLayout}>
            <Card.Body>
              <div className={styling.classListText}>{children}</div>
            </Card.Body>
          </div>
        </div>
        {source && (
          <div>
            <Card.Img
              style={{ width: styling.imageWidth, height: styling.imageHeight }}
              src={source}
              className={styling.classListImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicCard;
