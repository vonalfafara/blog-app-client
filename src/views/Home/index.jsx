import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import http from "../../lib/http";
import Blog from "../../components/Blog";
import Pagination from "../../components/Pagination";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState({});
  const [loggedIn, _] = useState(JSON.parse(localStorage.getItem("user")));

  async function getBlogs(page = 1) {
    const url = `/blogs?page=${page}`;
    const res = await http.get(url);
    setBlogs(res.data.data);
    setMeta(res.data.meta);
  }

  useEffect(() => {
    getBlogs();
    return;
  }, []);

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
        <h3>The place for bloggerz to share</h3>
        {loggedIn && (
          <Button variant="primary" onClick={() => navigate("/create-blog")}>
            Create Blog
          </Button>
        )}
      </div>
      <Container className="my-4">
        {blogs.map((blog, index) => {
          return (
            <Row key={index} className="mb-4">
              <Col>
                <Blog
                  id={blog.id}
                  title={blog.title}
                  author={blog.user.name}
                  dateCreated={format(
                    new Date(blog.created_at),
                    "MMMM dd, yyyy"
                  )}
                  subtitle={blog.subtitle}
                />
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            {meta.links && (
              <Pagination
                links={meta.links}
                active={meta.current_page}
                getBlogs={getBlogs}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default index;
