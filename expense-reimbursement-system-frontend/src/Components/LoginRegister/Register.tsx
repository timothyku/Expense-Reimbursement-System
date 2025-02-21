import axios from "axios"
import { Button, Container, Form } from "react-bootstrap"

export const Register:React.FC = () => {

    //Use axios to send HTTP requests from React
    const register = async() => {

        const response = await axios.post(
            "http://localhost:8080/auth/register",
            {
                firstname:"React", lastname:"User",
                username:"reactUser", password:"password"
            }
        )
        .then(() => {
            alert("User created!")
        })

    }

    return(
        <Container>
            <div>
                <h1>New here? Create an Account for free!</h1>
            </div>
            <div>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                />
            </div>
            <div>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                />
            </div>
            <div>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                />
            </div>
            <div>
                <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                />
            </div>
            <br />
            <div>
                <Button onClick={register}>Create Account</Button>
            </div>
        </Container>

    )
}