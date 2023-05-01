import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../../firebase.config';
import './Register.css';

const auth = getAuth(app);

const Register = () => {
  const [user, setUser] = useState(null);

  const handleFormSubmit = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
    .then(res => {
      const loggedUser = res.user;
      console.log(loggedUser);
      setUser(loggedUser);
    })
    .catch(err => {
      console.log(err.message);
    })

  }
  return (
    <div>
      <h5>Sign-up for a new account</h5>
      <Form onSubmit={handleFormSubmit} className="my-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Your Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Your Password" />
      </Form.Group>
      <Form.Group className="mb-3 terms-and-conditions" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check Terms & Conditions." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </div>
  )
}

export default Register