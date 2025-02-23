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
            const response = await axios.get("http://localhost:8080/users",
            {withCredentials:true})
            //Again, we need withCredentials if the request requires specific session info
            

            //TODO: error throwing code

            console.log(response.data) //print out the data just to see it

            //store the user data in our "users" state object
            setUsers(response.data)

        } catch {
            alert("Something went wrong tryig to fetch users")
        } 
    }

    const deleteUser = async (user:User) => {
        if (window.confirm("Delete this user?")) {
            const response = await axios.post("http://localhost:8080/users/delete",  { userId: user.userId } , { withCredentials: true});
        }
        getAllUsers()
    }

    //function that does a fake update delete (wanna show how to extract data from a map)
    const updateUser = (user:User) => {
        alert("User " + user.userId + " has been fake updated or deleted")
        
        //TODO: could make another call to getAllUsers for automatic udpates
        //TODO2: (alternative to option 1) cache the list of users and update that so we don't make a repeat DB call
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
                        <th>Promotion</th>
                        <th>Delete</th>
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
                            <td>
                                <Button variant="outline-success" onClick={()=> updateUser(user)}>Promote</Button>
                                <Button variant="danger" onClick={()=> updateUser(user)}>Fire</Button>
                            </td>
                            <td><Button variant="danger" onClick={()=> deleteUser(user)}>Delete</Button></td>
                        </tr>
                    ))} {/* WHY () to open the arrow func? bc it implicityly returns (i.e. no need the return keyword) */}
                </tbody>

            </Table>

        </Container>
    )
}