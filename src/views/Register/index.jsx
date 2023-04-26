import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import http from "../../lib/http";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  });
  const [validated, setValidated] = useState(false);

  async function register(e) {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation
    ) {
      return;
    }

    try {
      const body = {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      };
      const res = await http.post("/register", body);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      navigate("/");
      navigate(0);
    } catch (e) {
      if (e.response.data.errors) {
        setErrors({
          name: e.response.data.errors.name ? e.response.data.errors.name : [],
          email: e.response.data.errors.email
            ? e.response.data.errors.email
            : [],
          password: e.response.data.errors.password
            ? e.response.data.errors.password
            : [],
          passwordConfirmation: e.response.data.errors.password_confirmation
            ? e.response.data.errors.password_confirmation
            : [],
        });
      } else {
        alert(e.response.data.message);
      }
    }
  }

  return (
    <div className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Register to start posting blogs</h3>
          <Form noValidate validated={validated} onSubmit={register}>
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.name.map((error, index) => {
                  return <p key={index}>{error}</p>;
                })}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.email.map((error, index) => {
                  return <p key={index}>{error}</p>;
                })}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.password.map((error, index) => {
                  return <p key={index}>{error}</p>;
                })}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirmation.map((error, index) => {
                  return <p key={index}>{error}</p>;
                })}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>
                Register
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default index;
