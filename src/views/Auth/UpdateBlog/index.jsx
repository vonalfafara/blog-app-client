import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import http from "../../../lib/http";
import { useNavigate, useParams } from "react-router-dom";

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    async function getBlog() {
      const res = await http.get(`/blogs/${id}`);
      setTitle(res.data.title);
      setSubtitle(res.data.subtitle);
      setBody(res.data.body);
    }

    getBlog();
    return;
  }, []);

  async function submit(e) {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    if (!title || !body) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      let uploadRes;

      let blogData = {
        title,
        subtitle,
        body,
      };

      if (image) {
        uploadRes = await http.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        blogData.image = uploadRes.data.image_name;
      }

      const res = await http.put(`/blogs/${id}`, blogData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate(`/${res.data.id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4">Update Blog</h3>
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group className="mb-4">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a title
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as="textarea"
            placeholder="Body"
            value={body}
            rows={5}
            onChange={(e) => setBody(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a body
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Banner</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Update Blog
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default index;
