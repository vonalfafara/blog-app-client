import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../lib/http";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [loggedIn, _] = useState(JSON.parse(localStorage.getItem("user")));
  const [show, setShow] = useState(false);

  async function getBlog() {
    const res = await http.get(`/blogs/${id}`);
    setBlog(res.data);
  }

  async function deleteBlog() {
    setShow(false);

    await http.delete(`/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    navigate("/profile");
  }

  useEffect(() => {
    getBlog();
    return;
  }, []);

  return (
    <div>
      {blog && (
        <>
          {blog.image && (
            <img
              src={`${import.meta.env.VITE_API}/image/${blog.image}`}
              style={{
                height: "250px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "0 25%",
              }}
              alt=""
            />
          )}
          <div className="text-center my-4">
            <h3>{blog.title}</h3>
            <p style={{ fontSize: ".6rem" }}>
              <b>By {blog.user?.name}</b> |{" "}
              <span>{format(new Date(blog.created_at), "MMMM dd, yyyy")}</span>
            </p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: blog.body }}></p>
          {loggedIn?.id == blog.user.id && (
            <div className="d-flex justify-content-end mb-4">
              <Button
                onClick={() => navigate(`/update-blog/${id}`)}
                className="me-2"
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => setShow(true)}>
                Delete
              </Button>
            </div>
          )}
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete '{blog.title}'</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this blog?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Uhh give me a moment
              </Button>
              <Button variant="danger" onClick={deleteBlog}>
                Yes, delete it!
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default index;
