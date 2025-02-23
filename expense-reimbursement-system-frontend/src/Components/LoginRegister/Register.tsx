import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa"; // Icon for register button

export const Register: React.FC = () => {
  const navigate = useNavigate();

  // State to store form input values
  const [registerCreds, setRegisterCreds] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  });

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
  };

  // Handle registration
  const register = async () => {
    const { firstname, lastname, username, password } = registerCreds;

    // Simple input validation
    if (!firstname || !lastname || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/register", registerCreds);
      alert("User created successfully!");
      navigate("/"); // Redirect to login page after success
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg w-50">
        <h2 className="text-center mb-4">Create an Account</h2>

        <Form>
          <Form.Group controlId="firstname" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstname"
              value={registerCreds.firstname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastname" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastname"
              value={registerCreds.lastname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              name="username"
              value={registerCreds.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={registerCreds.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button variant="primary" className="me-2 px-4" onClick={register}>
                <FaUserPlus className="me-2" /> Create Account
              </Button>
              <Button variant="dark" onClick={() => navigate("")}>
                Back to Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};