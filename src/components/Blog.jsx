import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ id, title, author, noOfComments, dateCreated, subtitle }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <h6>
          <Link to={`/${id}`}>{title}</Link>
        </h6>
      </div>
      <p style={{ fontSize: ".6rem" }}>
        <b>By {author}</b> | <span>{dateCreated}</span> |{" "}
        <span>Comments: {noOfComments}</span>
      </p>
      <p style={{ fontSize: ".8rem" }}>{subtitle}</p>
    </>
  );
};

export default Blog;
