import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../../../firebase.config';


const auth = getAuth(app);

const Login = () => {
  const[user, setUser] = useState(null);
  const [error, setError] = useState('');
  const emailRef = useRef();

  const handleFormSubmit = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      const loggedUser = res.user;
      console.log(loggedUser);
      if(!loggedUser.emailVerified) {
        alert("Please verify your email address first.");
        return;
      }
      setUser(loggedUser);
      setError('');
      event.target.reset();
    })
    .catch(err => {
      console.log(err.message);
      setUser(null);
      setError(err.message);
    })
  }

  const handleForgotPassword = () => {
    const resetEmail = emailRef.current.value;
    if(!resetEmail) {
      alert("Please provide an email address.");
      return;
    }
    sendPasswordResetEmail(auth, resetEmail)
    .then(res => {
      alert("Please check your email address.");
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  return (
    <div className='w-50 m-5 p-3 border'>
      <h3 className='my-3'>Sign In</h3>
      { 
        error && <div className='text-white bg-danger mb-3 p-3 rounded-1'> { error }</div> 
      }
      
      <Form onSubmit={handleFormSubmit} className="my-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' ref={emailRef} placeholder="Your Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Your Password" />
      </Form.Group>
      <Form.Group className="mb-3 terms-and-conditions" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
      <p><small>Forgot Password? <button className='border-0' onClick={handleForgotPassword}>Reset</button></small></p>
    </div>
  )
}

export default Login