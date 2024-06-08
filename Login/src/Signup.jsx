import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './SignUp.css'

const Signup = () => {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3001/SignUp', { name, email, pass })
          .then(res => {
              if (res.data.error) {
                  toast.error(res.data.error);
              } else {
                  toast.success(res.data.message);
              }
          })
          .catch(err => {
              console.log(err);
              toast.error('Error during signup');
          });
  }
  

  return (
    <div className="container mt-5">
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username"
              onChange={(e) => 
                  setName(e.target.value)
              }
             />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" 
              onChange={(e) => 
                  setEmail(e.target.value)
              }            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" 
              onChange={(e) => 
                  setPass(e.target.value)
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
        <p className="mt-3">Already have an account? <a href="/Signin">Sign in</a></p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
