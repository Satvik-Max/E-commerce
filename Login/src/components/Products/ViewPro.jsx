import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewPro = () => {
    const [isadmin,setisadmin] = useState(false);
    const [product, setProduct] = useState(null);
    const userId = localStorage.getItem('user');
    const { productId } = useParams();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/productDetails/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };  
        const CheckAdmin = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/Admin/${userId}`, { userId });
                setisadmin(res)
            } catch(error) {
                onsole.error('Error Checking Admin:', error);
            }
        }      
        fetchProduct();
        CheckAdmin();
    }, [productId]);

    const handleCart = async () => {
      const productId = product._id;
      if (userId && productId) {
          try {
              await axios.post("http://localhost:3001/AddingToCart", { userId, product })
              .then (toast.success(toast.success("Product added to cart successfully")))
          } catch (error) {
              toast.error('Error adding product to cart');
              console.error('Error adding product to cart:', error);
          }
      } else {
          console.error('User ID or Product ID not found');
      }
  };
  
    return (
        <div className="product-details-container">
            {product ? (
                <div className="product-details">
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <div className="product-price">Price: ${product.newPrice}</div>
                        <button className="order-button">Order Now</button>
                        <button onClick={handleCart} className="cart-button">Add To Cart Now</button>
                        {isadmin?  <h2> Edit </h2>:
                        <p> User Account </p>
                        }
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default ViewPro;
