import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { User } from "../../Interfaces/User"


export const UserTable:React.FC = () => {

    //state object to store the user array from the backend
    const [users, setUsers] = useState<User[]>([])

    //useEffect - we'll call a GET request for all users when the compoents loads
    useEffect(() => {

        //TODO: make sure the user is a manager, redirect them to login if not

        getAllUsers()

    }, []) //we want this to run once on load, so we use []


    //Function to get all users from the backend (HTTP request)
    const getAllUsers = async () => {
        
        try{
            const response = await axios.get("http://localhost:8080/users")
            

            //TODO: error throwing code

            console.log(response.data) //print out the data just to see it

            //store the user data in our "users" state object
            setUsers(response.data)

        } catch {
            alert("Something went wrong tryig to fetch users")
        } 
    }

    return (
        <Container className="d-flex flex-column align-items-center">

            <h3>Users: </h3>

            <Table className="table-dark table-hover table-striped w-50">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody className="table-secondary">
                    {users.map((user:User) => (
                        <tr key={user.userId}> {/* To optimize performance, so no need to refresh whole table but only a row when a specific user data is updated*/}
                            <td>{user.userId}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))} {/* WHY () to open the arrow func? bc it implicityly returns (i.e. no need the return keyword) */}
                </tbody>

            </Table>

        </Container>
    )
}