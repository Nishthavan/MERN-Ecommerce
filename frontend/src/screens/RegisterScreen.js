import React, { useState, useEffect } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import Meta from "../components/Meta"

const RegisterScreen = ({ location, history }) => {
  // If user is already Logged In access to register is revoked
  const isLogin = useSelector((state) => state.userLogin.userInfo)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const redirect = location.search ? location.search.split("=")[1] : "/"

  const dispatch = useDispatch()
  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  )

  useEffect(() => {
    if (userInfo || isLogin) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo, isLogin])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      setMessage(null)
      dispatch(register(name, email, password))
    } else {
      setMessage("Password Don't Match")
    }
  }

  return (
    <FormContainer>
      <Meta title='Welcome to ProStore | Register' />
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' varinat='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
