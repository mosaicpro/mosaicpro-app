import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

function BlogCard({
  cardTitle,
  children,
  source,
  authorName,
  createdAt,
  thumbnail,
  tags,
  styling,
}) {
  return (
    <div style={{ width: styling.width }} className={styling.classList}>
      <div className={styling.cardWidthClass}>
        <div className={styling.classListAuthorLayout}>
          <img
            style={{
              height: styling.authorImageSize,
              width: styling.authorImageSize,
            }}
            src={thumbnail}
            className={styling.authorImageClassList}
          />
          <p style={{ alignSelf: "center" }}>
            {authorName + " · "}
            <small className="mb-0 text-muted px-1">
              {moment(createdAt).fromNow()}
            </small>
          </p>
        </div>
        <div className={styling.classListCard}>
          <div style={{width:"85%"}}>
            <Card.Title>
              <p className={styling.classListTitle}>{cardTitle}</p>
            </Card.Title>
            <div className={styling.classListCardLayout}>
              <div className={styling.classListText}>{children}</div>
            </div>
          </div>
          {source && (
            <div className={styling.classListImageLayout}>
              <Card.Img
                style={{ width: styling.imageSize, height: styling.imageSize }}
                src={source}
                className={styling.classListImage}
              />
            </div>
          )}
        </div>
        <div className={styling.tagLayoutClassList}>
          {tags.split(",").map((tag, key) => (
            <div
              style={{ minWidth: "60px" }}
              className={styling.tagClassList}
              key={key}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
