import { Container, Form } from "react-bootstrap"

export const Register:React.FC = () => {


    return(
        
        <Container>
          <div>
              <h1>New here? Create an Account for free!</h1>

              <div>
                  <Form.Control
                      type="text"
                      placeholder="username"
                      name="username"
                  />
              </div>
              <div>
                  <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                  />
              </div>

              <div>
                <button>Create Account!</button>
              </div>
          </div>
      </Container>

    )
}