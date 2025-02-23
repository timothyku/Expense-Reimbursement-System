import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

export const NewRequest:React.FC = () => {

    const navigate = useNavigate();
    const descriptionRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.focus();
        }

    }, [])

    // retrieve the stored 
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    const [requestCreds, setRequestCreds] = useState({
        description:"",
        amount:"",
        status:"Pending",
        userId:storedUser?.userId,
    });

    const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRequestCreds((preCreds) => ({ ...preCreds, [name]:value}));
    };

    
    const createRequest = async() => {
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
            const response = await axios.post("http://localhost:8080/requests", requestCreds, { withCredentials: true });
            alert("An expense reimbursement request has been created!")
            navigate("/requests/my-requests"); //Redirect to the request table page after successful
        } catch {
            alert("Cannot create a new expense reimbursement request. Please try again.")
        }

    }

    return(
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg w-50">
            <h2 className="text-center mb-4">New Expense Reimbursement Request</h2>

        <Form>
            <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              name="description"
              ref={descriptionRef}
              onChange={storeValues}
            />
          </Form.Group>

          <Form.Group controlId="amoount" className="mb-3">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              name="amount"
              onChange={storeValues}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
                <Button variant="secondary" className="me-2 px-4" onClick={() => navigate("/requests/my-requests")}>
                    <FaArrowLeft className="me-2" /> Back
                </Button>
                <Button variant="primary" className="me-2 px-4" onClick={createRequest}>
                    <FaPaperPlane className="me-2" /> Submit
                </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
    )


}