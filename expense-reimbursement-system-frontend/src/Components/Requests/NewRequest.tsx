import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

export const NewRequest: React.FC = () => {
  const navigate = useNavigate();
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, []);

  // retrieve the stored user
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const [requestCreds, setRequestCreds] = useState({
    description: "",
    amount: "",
    status: "Pending",
    userId: storedUser?.userId,
  });

  const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRequestCreds((preCreds) => ({ ...preCreds, [name]: value }));
  };

  const createRequest = async () => {
    if (!requestCreds.description && !requestCreds.amount) {
      alert("Please enter both description and amount.");
      return;
    } else if (!requestCreds.description) {
      alert("Please enter description.");
      return;
    } else if (!requestCreds.amount) {
      alert("Please enter amount.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/requests",
        requestCreds,
        {
          withCredentials: true,
        }
      );
      alert("An expense reimbursement request has been created!");
      navigate("/requests/my-requests"); // Redirect to the request table page after successful creation
    } catch {
      alert(
        "Cannot create a new expense reimbursement request. Please try again."
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow-lg w-50"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center mb-4 text-dark">
          New Expense Reimbursement Request
        </h2>

        <Form>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              name="description"
              ref={descriptionRef}
              onChange={storeValues}
              style={{
                backgroundColor: "#f1f3f5",
                borderColor: "#ced4da",
                borderRadius: "4px",
              }}
            />
          </Form.Group>

          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              name="amount"
              onChange={storeValues}
              style={{
                backgroundColor: "#f1f3f5",
                borderColor: "#ced4da",
                borderRadius: "4px",
              }}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button
                variant="secondary"
                className="me-2 px-4"
                onClick={() => navigate("/requests/my-requests")}
                style={{
                  backgroundColor: "#6c757d",
                  borderColor: "#6c757d",
                  transition: "background-color 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#5a6268")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6c757d")
                }
              >
                <FaArrowLeft className="me-2" /> Back
              </Button>
              <Button
                variant="primary"
                className="me-2 px-4"
                onClick={createRequest}
                style={{
                  backgroundColor: "#0056b3", // Darker blue for consistency with the theme
                  borderColor: "#0056b3",
                  transition: "background-color 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#004085")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
              >
                <FaPaperPlane className="me-2" /> Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};
