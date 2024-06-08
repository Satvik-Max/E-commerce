import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/Signin', { email, pass })
      .then((res) => {
        toast.success('Login Successful');
        const { token } = res.data;
        localStorage.setItem('token', token );
        localStorage.setItem('user', email );
        console.log(localStorage.getItem('user'));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Invalid credentials');
      });
  };

  return (
    <div className="container mt-4">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) =>
                setPass(e.target.value)
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="mt-3">Not a member? <a href="/SignUp">Sign up</a></p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
