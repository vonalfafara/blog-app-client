import React, { useState, useEffect, useRef } from "react";
import { Col, Row, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import http from "../../../lib/http";
import Blog from "../../../components/Blog";
import Pagination from "../../../components/Pagination";
import { format } from "date-fns";

const index = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState({});
  const file = useRef(null);

  async function getUserBlogs(page = 1) {
    const res = await http.get(`/blogs/user/${user.id}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setBlogs(res.data.data);
    setMeta(res.data.meta);
  }

  async function updateUserProfilePicture(e) {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await http.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 201) {
        const body = {
          profile_picture: res.data.image_name,
        };

        const updateResponse = await http.put("/users/profile", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const newUser = updateResponse.data.user;

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUserBlogs();
    return;
  }, []);

  return (
    <div className="mt-4">
      {user && (
        <>
          <Row className="mb-4 d-flex justify-content-center">
            <Col className="text-center text-md-end mb-4 mb-md-0">
              <Form className={user.profile_picture ? "d-none" : ""}>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  ref={file}
                  onChange={updateUserProfilePicture}
                />
              </Form>
              {user.profile_picture && (
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>Update profile picture</Tooltip>}
                >
                  <img
                    style={{
                      height: "300px",
                      width: "300px",
                      borderRadius: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    src={`${import.meta.env.VITE_API}/image/${
                      user.profile_picture
                    }`}
                    alt=""
                    onClick={() => file.current.click()}
                  />
                </OverlayTrigger>
              )}
            </Col>
            <Col className="text-center text-md-start d-flex flex-column justify-content-center">
              <h3>{user.name}</h3>
              <h5>{user.email}</h5>
            </Col>
          </Row>
          {blogs.map((blog, index) => {
            return (
              <Row key={index} className="mb-4">
                <Col>
                  <Blog
                    id={blog.id}
                    title={blog.title}
                    author={blog.user?.name}
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
                  getBlogs={getUserBlogs}
                />
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default index;
