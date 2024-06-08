import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'; 
import { Link } from 'react-router-dom';
import Navbar from '../common/NavBar';


export const CartContext = React.createContext();

const Cart = () => {
    const { userId } = useParams();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartLength, setCartLength] = useState(0);
    const loginuser = localStorage.getItem("user");

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/cartitems/${userId}`);
                setCart(response.data);
                setCartLength(response.data.length);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, [userId]);

    useEffect(() => {
        const totalPrice = cart.reduce((acc, item) => acc + item.newPrice, 0);
        setTotal(totalPrice);
    }, [cart]);

    async function handleremovecart(index, price) {
        try {
            await axios.post("http://localhost:3001/removefromcart", { index, userId });
            const response = await axios.get(`http://localhost:3001/cartitems/${userId}`);
            setCart(response.data);
            setCartLength(response.data.length);
            setTotal(total - price);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    return (
        <CartContext.Provider value={cartLength}> 
        <Navbar name={loginuser} />
            <div className="cart-container">
                {loginuser === userId ? (
                    <>
                        {cart.length === 0 ? (
                            <h2>Your Cart Is Empty</h2>
                        ) : (
                            <div>
                                <h3>Your Cart</h3>
                                <div className="cart-items">
                                    {cart.map((item, index) => (
                                        <div className="cart-item" key={index}>
                                            <Link to={`/productDetails/${item._id}`}>
                                                <h4>Name: {item.name}</h4>
                                            </Link>
                                            <p>ID: {item._id}</p>
                                            <p>New Price: ${item.newPrice}</p>
                                            <p>Description: {item.description}</p>
                                            <button onClick={() => handleremovecart(index,item.newPrice)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <h3>Your Total Price: </h3> <h2>${total}</h2>
                    </>
                ) : (
                    <>
                        <h1>Access Denied For Cart Page</h1>
                        <h2>You're Not {userId}</h2>
                    </>
                )}
            </div>
        </CartContext.Provider>
    );
}

export default Cart;
