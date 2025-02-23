import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table, Card, Badge, Spinner } from "react-bootstrap";
import { Request } from "../../Interfaces/Request";
import { FaClipboardList, FaClock, FaPlus } from "react-icons/fa"; // Icons for buttons
import { useNavigate } from "react-router-dom";

export const OthersRequestTable: React.FC = () => {

  const navigate = useNavigate(); //Hook for navigation
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    getOthersPendingRequests();
  }, []);

  // Fetch all reimbursement requests
  const getAllRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/requests/all-requests", { withCredentials: true });
      setRequests(response.data);
    } catch {
      alert("Something went wrong while fetching requests");
    }
    setLoading(false);
  };

  // Fetch only pending reimbursement requests
  const getOthersPendingRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/requests/others-pending-requests", { withCredentials: true });
      setRequests(response.data);
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
        variant = "warning";
        break;
      case "approved":
        variant = "success";
        break;
      case "rejected":
        variant = "danger";
        break;
      default:
        variant = "secondary";
    }
    return <Badge bg={variant}>{status.toUpperCase()}</Badge>;
  };


  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Card className="shadow-lg p-4 w-75">
        <h3 className="text-center mb-4">Expense Reimbursement Requests</h3>

        {/* Buttons to filter All/Pending requests */}
        <div className="d-flex justify-content-center mb-3">
          <Button variant="warning" className="me-2" onClick={getOthersPendingRequests}>
            <FaClipboardList className="me-2" /> Others Pending Requests
          </Button>
          <Button variant="primary" className="me-2" onClick={getAllRequests}>
            <FaClock className="me-2" /> All Requests
          </Button>
          <Button variant="primary" className="me-2" onClick={() => navigate("/requests/new-request")}>
            <FaPlus className="me-2" /> Create A New Request
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto mb-3" />}

        {/* Requests Table */}
        <Table className="table-hover text-center" striped bordered>
          <thead className="table-dark">
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
  );
};