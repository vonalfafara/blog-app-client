import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../lib/http";
import { format } from "date-fns";
import { Button, Modal, Card, Row, Col, Form } from "react-bootstrap";

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [loggedIn, _] = useState(JSON.parse(localStorage.getItem("user")));
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);
  const [commentIdEdit, setCommentIdEdit] = useState();
  const [commentEdit, setCommentEdit] = useState("");
  const [validatedEdit, setValidatedEdit] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

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

  async function submit(e) {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    if (!comment) {
      return;
    }

    try {
      const body = {
        blog_id: id,
        body: comment,
      };

      const res = await http.post("/comments", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 201) {
        getBlog();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function submitEdit(e, commentId) {
    e.preventDefault();
    e.stopPropagation();

    setValidatedEdit(true);

    if (!commentEdit) {
      return;
    }

    try {
      const body = {
        body: commentEdit,
      };

      const res = await http.put(`/comments/${commentId}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        getBlog();
      }
      setOnEdit(false);
      setCommentEdit("");
    } catch (e) {
      console.log(e);
    }
  }

  function handleOnEdit(commentOnEdit, commendId) {
    setOnEdit(!onEdit);
    setCommentEdit(commentOnEdit);
    setCommentIdEdit(commendId);
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
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          ></p>
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
          <h3 className="mb-4">Comments</h3>
          {loggedIn && (
            <Row>
              <Col sm={1} className="pt-2">
                {loggedIn.profile_picture && (
                  <img
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                      display: "block",
                      marginLeft: "auto",
                    }}
                    src={`${import.meta.env.VITE_API}/image/${
                      loggedIn.profile_picture
                    }`}
                    alt=""
                  />
                )}
              </Col>
              <Col sm={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={(e) => submit(e)}
                    >
                      <Form.Group className="mb-2">
                        <Form.Control
                          required
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please put a comment
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {blog.comments &&
            blog.comments.map((comment, index) => {
              return (
                <Row key={index}>
                  <Col sm={1} className="pt-2">
                    {comment.user.profile_picture && (
                      <img
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                          display: "block",
                          marginLeft: "auto",
                        }}
                        src={`${import.meta.env.VITE_API}/image/${
                          comment.user.profile_picture
                        }`}
                        alt=""
                      />
                    )}
                  </Col>
                  <Col sm={6}>
                    <Card className="mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <p className="mb-0">
                            <b>{comment.user.name}</b>
                            <span className="mx-1">•</span>
                            <span>
                              {format(
                                new Date(comment.created_at),
                                "MMMM dd, yyyy"
                              )}
                            </span>
                          </p>
                          {loggedIn.id === comment.user.id && (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() =>
                                handleOnEdit(comment.body, comment.id)
                              }
                            >
                              Edit
                            </Button>
                          )}
                        </div>
                        {!onEdit ||
                        loggedIn.id !== comment.user.id ||
                        comment.id !== commentIdEdit ? (
                          <p
                            dangerouslySetInnerHTML={{ __html: comment.body }}
                          ></p>
                        ) : (
                          <Form
                            noValidate
                            validated={validatedEdit}
                            onSubmit={(e) => submitEdit(e, comment.id)}
                          >
                            <Form.Group className="mb-2">
                              <Form.Control
                                required
                                as="textarea"
                                value={commentEdit}
                                onChange={(e) => setCommentEdit(e.target.value)}
                              ></Form.Control>
                              <Form.Control.Feedback type="invalid">
                                Please put a comment
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-end">
                              <Button variant="primary" type="submit">
                                Submit
                              </Button>
                            </Form.Group>
                          </Form>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            })}
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
