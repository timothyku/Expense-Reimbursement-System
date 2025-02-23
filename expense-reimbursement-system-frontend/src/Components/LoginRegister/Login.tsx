import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";
import { FaSignInAlt } from "react-icons/fa"; // Icon for login button

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: ""
  });

  const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
  };

  const login = async () => {
    if (!loginCreds.username || !loginCreds.password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", loginCreds, { withCredentials: true });
      store.loggedInUser = response.data;
      // local store the loggged in User data to use when we create a new request
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      alert(`${store.loggedInUser.username} has logged in! Welcome.`);

      if (store.loggedInUser.role === "manager") {
        navigate("/users");
      } else {
        navigate("/requests/my-requests");
      }
    } catch {
      alert("Login Failed. Please check your credentials.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg w-50">
        <h2 className="text-center mb-4">Welcome</h2>
        <h4 className="text-center text-muted">Please Log In</h4>

        <Form>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              ref={usernameRef}
              onChange={storeValues}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={storeValues}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button variant="success" className="me-2 px-4" onClick={login}>
                <FaSignInAlt className="me-2" /> Login
              </Button>
              <Button variant="dark" onClick={() => navigate("/register")}>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};