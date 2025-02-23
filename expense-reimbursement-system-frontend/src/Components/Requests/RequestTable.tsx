import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { Request } from "../../Interfaces/Request"

export const RequestTable:React.FC = () => {

    const [requests, setRequests] = useState<Request[]>([])

    // call a GET request for the logged-in user's requests when the components loads
    useEffect(() =>{

        getMyRequests()

    }, [])

    // get all the Expense Reimbursement Requests
    const getMyRequests = async () => {

        try{
            const response = await axios.get("http://localhost:8080/requests/my-requests",
            {withCredentials:true})
            
            setRequests(response.data)
        
        } catch {
            alert("Something went wrong trying to fetch the Expense Reimbursement Requests")
        }

    }

    // get al the pending Expense Reimbursement Requests
    const getMyPendingRequests = async () => {

        try{
            const response = await axios.get("http://localhost:8080/requests/my-pending-requests",
            {withCredentials:true})

            setRequests(response.data)
    
        } catch {
            alert("Something went wrong trying to fetch the Pending Expense Reimbursement Requests")
        }

    }

    return(
        <Container className="d-flex flex-column align-items-center">

            <h3>Expense Reimbursement Requests: </h3>

            {/* Buttons to filter All/Pending requests */}
            <div className="mb-3">
                <Button variant="primary" className="me-2" onClick={getMyRequests}>
                    All Requests
                </Button>
                <Button variant="warning" onClick={getMyPendingRequests}>
                    Pending Requests
                </Button>
            </div>

            <Table className="table-dark table-hover table-striped w-50">
                <thead>
                    <tr>
                        <th>Request Id</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>

                <tbody className="table-secondary">
                    {requests.map((request:Request) => (
                        <tr key={request.reimbId}> {/* To optimize performance, so no need to refresh whole table but only a row when a specific user data is updated*/}
                            <td>{request.reimbId}</td>
                            <td>{request.description}</td>
                            <td>{request.amount}</td>
                            <td>{request.status}</td>
                            
                        </tr>
                    ))} {/* WHY () to open the arrow func? bc it implicityly returns (i.e. no need the return keyword) */}
                </tbody>

            </Table>

        </Container>
    )

}