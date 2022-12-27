import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/pages/Message/Message";
import Loader from "../../components/pages/Loading/Loading";
import FormContainer from "../../components/featurs/FormContainer/FormContainer";
import { register } from "../../actions/user-actions";


function RegisterScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do Not Match")
    } else {
      dispatch(register(name, email, password))

    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}></Form.Control >
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control >
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
          </Form.Control >

        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder=" Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}>
          </Form.Control >
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          Register
        </Button>

      </Form>
      <Row className="py-3">
        <Col>
          Haeve an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
