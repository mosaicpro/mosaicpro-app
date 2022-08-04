import React from "react";
import { Card } from "react-bootstrap";

function WorkIndexCard({
  classList,
  width,
  cardTitle,
  children,
  classListCard,
  classListTitle,
  classListText,
  source,
  imageWidth,
  imageHeight,
  classListImage,
  classListCardLayout,
  cardWidthClass,
}) {
  return (
    <div style={{ width: width }} className={classList}>
      <div className={cardWidthClass}>
        <div className={classListCard}>
          <div>
            <Card.Title>
              <div className={classListTitle}>{cardTitle}</div>
            </Card.Title>
            <div className={classListCardLayout}>
              <Card.Body>
                <div className={classListText}>{children}</div>
              </Card.Body>
            </div>
          </div>
          {source ? (
            <div>
              <Card.Img
                style={{ width: imageWidth, height: imageHeight }}
                src={source}
                className={classListImage}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkIndexCard;
