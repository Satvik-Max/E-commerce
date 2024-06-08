import React, { useState, useEffect } from 'react';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import Products from '../components/Products/Products';
import Carousel from 'react-bootstrap/Carousel';
import logo from "./person-adding-clothes-cart-closeup-online-shopping-campaign.jpg"
import logo2 from "./photocomposition-horizontal-online-shopping-banner.jpg"
import logo3 from "./macbook.jpg"
import axios from 'axios';
import "./styles/Homepage.css"

const Homepage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(  " from localstoarage : " , localStorage.getItem('user'));
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get('http://localhost:3001/', { headers })
        .then((response) => setMessage(response.data.message))
        .catch((error) => {
          console.error('Error accessing protected resource', error);
          console.log(error)
          localStorage.removeItem('token');
          window.location.href = '/signin';
        });
    } else {
      window.location.href = '/signin';
    }
  }, []);

  return (
    <>
       <NavBar name={message} />
       <Carousel>
      <Carousel.Item>
        <img src={logo} alt="slide1" />
      </Carousel.Item>
      <Carousel.Item>
      <img src={logo2} alt="slide1" />
      </Carousel.Item>
      <Carousel.Item>
       <img src={logo3} alt="slide1" />
      </Carousel.Item>
    </Carousel>
    <Products />
    <Footer/>
    </>
  );
};

export default Homepage;