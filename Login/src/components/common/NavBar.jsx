import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navBar.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import axios from 'axios';

const Navbar = (props) => {
    const userId = localStorage.getItem("user");
    const [dropdown, setDropdown] = useState(false);
    const [cartLength, setCartLength] = useState(0);
    function toggleDropdown() {
        setDropdown(!dropdown);
    }
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/cartitems/${userId}`);
                setCartLength(response.data.length);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, [userId]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
    }
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">SatvixEshop</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li> 
                    <li><Link to="/suggestions">Suggestions</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <div className="nav-icons">
                    <div className="cart-logo">
                        <Link to={`/Cart/${userId}`}><FaShoppingCart />
                        {cartLength > 0 && (
                    <span className="badge">{cartLength}</span>
                    )}
                        </Link> 
                    </div>
                    <div className="profile-logo" onClick={toggleDropdown}>
                        <FaUser />
                        {dropdown && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li>{props.name}</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
