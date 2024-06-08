import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Products.css";
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get('http://localhost:3001/ProductData', { headers }) 
        .then(response => {
          setProducts(response.data); 
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    } else {
      window.location.href = '/signin';
    }
  }, []); 


  return (
    <>
      <h3> Our Products </h3>
      <div className="products">
        {products.map(product => (
          <div key={product._id} className="product">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-price">
                <span className="old-price">${product.oldPrice}</span>
                <span className="new-price">${product.newPrice}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <Link className='view-button' to={`/productDetails/${product._id}`}>View</Link>
              <button className="order-button">Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
