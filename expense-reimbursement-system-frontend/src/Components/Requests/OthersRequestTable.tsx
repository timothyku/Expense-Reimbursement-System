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
      
      const sortedRequests = response.data.sort((a, b) => {
        return Number(a.reimbId) - Number(b.reimbId);
    });
      
      setRequests(sortedRequests);
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
      
      const sortedRequests = response.data.sort((a, b) => {
        return Number(a.reimbId) - Number(b.reimbId);
    });
      
      setRequests(sortedRequests);
    } catch {
      alert("Something went wrong while fetching pending requests");
    }
    setLoading(false);
  };

  // Approve request
  const approveRequest = async (request:Request) => {
    
    const response = await axios.post("http://localhost:8080/requests/approve",
        {reimbId: request.reimbId }, 
        { withCredentials: true}
    )
    getOthersPendingRequests();
  };

  // Deny request
  const denyRequest = async (request:Request) => {
    
    const response = await axios.post("http://localhost:8080/requests/deny",
        {reimbId: request.reimbId }, 
        { withCredentials: true}
    )
    getOthersPendingRequests();
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
      case "denied":
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
        <h3 className="text-center mb-4">Expense Reimbursement Requests Pending Approval</h3>

        {/* Buttons to filter All/Pending requests */}
        <div className="d-flex justify-content-center mb-3">
          <Button variant="warning" className="me-2" onClick={getOthersPendingRequests}>
            <FaClipboardList className="me-2" /> Others Pending Requests
          </Button>
          <Button variant="primary" className="me-2" onClick={getAllRequests}>
            <FaClock className="me-2" /> All Requests
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto mb-3" />}

        {/* Requests Table */}
        <Table className="table-hover text-center" striped bordered>
          <thead className="table-dark">
            <tr>
              <th>Request ID</th>
              <th>Applicant</th>
              <th>Description</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests.map((request: Request) => (
                <tr key={request.reimbId}>
                  <td>{request.reimbId}</td>
                  <td>{request.user?.firstname + " " + request.user?.lastname}</td>
                  <td>{request.description}</td>
                  <td>{request.amount.toFixed(2)}</td>
                  <td>{renderStatusBadge(request.status)}</td>
                  <td>
                    <Button variant="success" onClick={() => approveRequest(request)}>Approve</Button>{' '}
                    <Button variant="danger" onClick={() => denyRequest(request)}>Deny</Button>
                  </td>
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