import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  Card,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { User } from "../../Interfaces/User";
import { useNavigate } from "react-router-dom";

export const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  // Fetch users from the backend
  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        withCredentials: true,
      });
      const sortedUsers = response.data.sort((a, b) => a.userId - b.userId);
      setUsers(sortedUsers);
    } catch {
      alert("Something went wrong while fetching users");
    }
  };

  // Delete a user
  const deleteUser = async (user: User) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.post(
        "http://localhost:8080/users/delete",
        { userId: user.userId },
        { withCredentials: true }
      );
      getAllUsers();
    }
  };

  // Toggle user role
  const updateUserRole = async (user: User) => {
    const newRole = user.role === "employee" ? "manager" : "employee";
    await axios.post(
      "http://localhost:8080/users/update-role",
      { userId: user.userId, newRole },
      { withCredentials: true }
    );
    getAllUsers();
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
            <NavDropdown.Item
              onClick={() => navigate("/requests/requests-for-approval")}
            >
              Request Management
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/requests/my-requests-manager")}>
              My Requests
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
          className="shadow-sm p-4 w-75 border-0"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h4 className="text-center mb-4 text-dark">User Management</h4>

          {/* User Table */}
          <Table hover responsive className="text-center">
            <thead className="bg-secondary text-light">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      {/* Updated Action Button with greyish hover color */}
                      <Button
                        size="sm"
                        variant="outline-secondary" // Duller color
                        onClick={() => updateUserRole(user)}
                        style={{
                          borderColor: "#B0BEC5", // Soft border color
                          color: "#607D8B", // Muted text color
                          transition: "background-color 0.3s, color 0.3s", // Smooth transition for color change
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#B0BEC5"; // Greyish background on hover
                          e.currentTarget.style.color = "#ffffff"; // White text on hover
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"; // Reset background on hover leave
                          e.currentTarget.style.color = "#607D8B"; // Reset text color
                        }}
                      >
                        Set to{" "}
                        {user.role === "employee" ? "Manager" : "Employee"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteUser(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-muted py-3">
                    No users found.
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
