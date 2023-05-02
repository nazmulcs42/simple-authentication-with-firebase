import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../../firebase.config';
import './Register.css';

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSeccess] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();
    setSeccess('');
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userName = event.target.name.value;
    //validate
    if(!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase.");
      return;
    }
    else if(!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please add at least two numbers.");
      return;
    }
    else if(password.length<6) {
      setError("Please add at least 6 characters.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(res => {
      const loggedUser = res.user;
      setUserName(loggedUser, userName);
      console.log(loggedUser);
      setError('');
      setSeccess("Your account has been created successfully.");
      event.target.reset();
      verifyEmail(loggedUser);
    })
    .catch(err => {
      console.log(err.message);
      setSeccess('');
      setError(err.message);
    })

  }

  const setUserName = (loggedUser, userName) => {
    updateProfile(loggedUser, {
      displayName: userName
    }).then(() => {
      console.log("Profile updated")
    }).catch((error) => {
      console.log("An error occurred. ", error.message)
    });
    
  }
  const verifyEmail = (user) => {
    sendEmailVerification(user)
    .then(res => {
      console.log(res);
      alert("Please verify your email address.")
    })
    .catch(err =>{
      console.log(err.message);
    })
  }

  return (
    <div className='w-50 m-5 p-3 border'>
      <h5 className='my-3'>Sign-up for a new account</h5>
      { 
        error && <div className='text-white bg-danger mb-3 p-3 rounded-1'> { error }</div> 
      }

      { 
        success && <div className='text-white bg-success mb-3 p-3 rounded-1'> { success } </div> 
      }
      
      <Form onSubmit={handleFormSubmit} className="my-3">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" name='name' placeholder="User Name" />
        </Form.Group>

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
          Register
        </Button>
    </Form>

    </div>
  )
}

export default Register