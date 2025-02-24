import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  Card,
  Badge,
  Spinner,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Request } from "../../Interfaces/Request";
import { FaClipboardList, FaClock, FaPlus } from "react-icons/fa"; // Icons for buttons
import { useNavigate } from "react-router-dom";

export const RequestTableManager: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    getMyPendingRequests();
  }, []);

  // Fetch all reimbursement requests
  const getMyRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/requests/my-requests",
        { withCredentials: true }
      );
      setRequests(response.data.sort((a, b) => b.reimbId - a.reimbId));
    } catch {
      alert("Something went wrong while fetching requests");
    }
    setLoading(false);
  };

  // Fetch only pending reimbursement requests
  const getMyPendingRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/requests/my-pending-requests",
        { withCredentials: true }
      );
      setRequests(response.data.sort((a, b) => a.reimbId - b.reimbId));
    } catch {
      alert("Something went wrong while fetching pending requests");
    }
    setLoading(false);
  };

  // Function to format status as a badge
  const renderStatusBadge = (status: string) => {
    let variant;
    switch (status.toLowerCase()) {
      case "pending":
        variant = "secondary";
        break;
      case "approved":
        variant = "success";
        break;
      case "denied":
        variant = "danger";
        break;
      default:
        variant = "dark";
    }
    return <Badge bg={variant}>{status.toUpperCase()}</Badge>;
  };

  return (
    <>
      {/* Navbar with Dropdown Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-3">
        <Navbar.Brand className="fw-bold text-light">
          Expense Reimbursement System
        </Navbar.Brand>
        <Nav className="ms-auto">
          {/* Dropdown Menu */}
          <NavDropdown title="Navigation" id="nav-dropdown" menuVariant="dark">
            <NavDropdown.Item onClick={() => navigate("/users")}>
              User Management
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/requests/requests-for-approval")}>
              Request Management
            </NavDropdown.Item>
          </NavDropdown>
          {/* Logout Button */}
          <Nav.Link className="text-light" onClick={() => navigate("/")}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* Main Content */}
      <Container className="d-flex flex-column align-items-center mt-4">
        <Card
          className="shadow-sm p-4 w-75"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h3 className="text-center mb-4 text-dark">
            Expense Reimbursement Requests
          </h3>

          {/* Buttons to filter All/Pending requests */}
          <div className="d-flex justify-content-center mb-3">
            <Button
              variant="outline-dark"
              className="button-hover-custom me-2"
              onClick={getMyPendingRequests}
            >
              <FaClock className="me-2" /> Pending Requests
            </Button>
            <Button
              variant="outline-dark"
              className="button-hover-custom me-2"
              onClick={getMyRequests}
            >
              <FaClipboardList className="me-2" /> All Requests
            </Button>
            <Button
              variant="outline-dark"
              className="button-hover-custom me-2"
              onClick={() => navigate("/requests/new-request")}
            >
              <FaPlus className="me-2" /> Create A New Request
            </Button>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <Spinner
              animation="border"
              variant="dark"
              className="d-block mx-auto mb-3"
            />
          )}

          {/* Requests Table */}
          <Table className="table-hover text-center" striped bordered>
            <thead className="bg-secondary text-light">
              <tr>
                <th>Request ID</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.length > 0 ? (
                requests.map((request: Request) => (
                  <tr key={request.reimbId}>
                    <td>{request.reimbId}</td>
                    <td>{request.description}</td>
                    <td>{request.amount.toFixed(2)}</td>
                    <td>{renderStatusBadge(request.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-muted text-center">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};
