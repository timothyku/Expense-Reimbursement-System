import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table, Card, Badge, Spinner, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Request } from "../../Interfaces/Request";
import { FaClipboardList, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const OthersRequestTable: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewAll, setViewAll] = useState<boolean>(false);

  useEffect(() => {
    getOthersPendingRequests();
  }, []);

  const fetchRequests = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/requests/${endpoint}`, { withCredentials: true });
      setRequests(response.data.sort((a, b) => a.reimbId - b.reimbId));
    } catch {
      alert("Something went wrong while fetching requests");
    }
    setLoading(false);
  };

  const getOthersPendingRequests = () => {
    setViewAll(false);
    fetchRequests("others-pending-requests");
  };

  const getAllRequests = () => {
    setViewAll(true);
    fetchRequests("all-requests");
  };

  const handleRequestAction = async (requestId: number, action: "approve" | "deny") => {
    await axios.post(`http://localhost:8080/requests/${action}`, { reimbId: requestId }, { withCredentials: true });
    getOthersPendingRequests();
  };

  const renderStatusBadge = (status: string) => {
    const variant = {
      pending: "secondary",
      approved: "success",
      denied: "danger"
    }[status.toLowerCase()] || "dark";

    return <Badge bg={variant} className="px-2 py-1">{status.toUpperCase()}</Badge>;
  };

  return (
    <>
      {/* Navbar with Dropdown Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-3">
        <Navbar.Brand className="fw-bold text-light">Expense Reimbursement System</Navbar.Brand>
        <Nav className="ms-auto">
          {/* Dropdown Menu */}
          <NavDropdown title="Navigation" id="nav-dropdown" menuVariant="dark">
            <NavDropdown.Item onClick={() => navigate("/users")}>User Management</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/requests/my-requests-manager")}>My Requests</NavDropdown.Item>
          </NavDropdown>
          {/* Logout Button */}
          <Nav.Link className="text-light" onClick={() => navigate("/")}>Logout</Nav.Link>
        </Nav>
      </Navbar>

      {/* Main Content */}
      <Container className="d-flex flex-column align-items-center mt-4">
        <Card className="shadow-sm p-4 w-75 border-0" style={{ backgroundColor: "#f8f9fa" }}>
          <h4 className="text-center mb-4 text-dark">Reimbursement Requests Management</h4>

          {/* Request Filter Buttons */}
          <div className="d-flex justify-content-center gap-2 mb-3">
            <Button variant={viewAll ? "outline-secondary" : "dark"} onClick={getOthersPendingRequests}>
              <FaClipboardList className="me-2" /> Pending Requests
            </Button>
            <Button variant={viewAll ? "dark" : "outline-secondary"} onClick={getAllRequests}>
              <FaClock className="me-2" /> All Requests
            </Button>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <Spinner animation="border" variant="dark" className="d-block mx-auto my-3" />
          ) : (
            <Table hover responsive className="text-center">
              <thead className="bg-secondary text-light">
                <tr>
                  <th>ID</th>
                  <th>Applicant</th>
                  <th>Description</th>
                  <th>Amount ($)</th>
                  <th>Status</th>
                  {!viewAll && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.reimbId}>
                      <td>{req.reimbId}</td>
                      <td>{req.user?.firstname} {req.user?.lastname}</td>
                      <td>{req.description}</td>
                      <td>{req.amount.toFixed(2)}</td>
                      <td>{renderStatusBadge(req.status)}</td>
                      {!viewAll && (
                        <td>
                          <Button size="sm" variant="outline-success" onClick={() => handleRequestAction(req.reimbId, "approve")}>Approve</Button>{' '}
                          <Button size="sm" variant="outline-danger" onClick={() => handleRequestAction(req.reimbId, "deny")}>Deny</Button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={viewAll ? 5 : 6} className="text-muted py-3">No requests found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </>
  );
};