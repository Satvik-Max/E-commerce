import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Admins } from './Admins';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Admin.css";

const Admin = () => {
    const [isAdmin , setAdmin] = useState(false);
    const [dshow , setdshow] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);
    const [productId, setProductId] = useState('');
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        oldPrice: 0,
        newPrice: 0,
        description: ""
    });
    const { userId } = useParams();
    const loginuser = localStorage.getItem('user');

    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/Admin/${userId}`, { loginuser });
                setAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setAdmin(false); 
            }
        };

        fetchAdminStatus();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };
    const handleDelete = async () => {
        try {
            await axios.post("http://localhost:3001/adminDeleteProduct", { productId });
            toast.success(" Product Deleted Successfully ");
            setProductData({
                name: '',
                image: '',
                oldPrice: 0,
                newPrice: 0,
                description: ""
            });
            setProductId('');
            setDeleteForm(false);
        } catch (error) {
            toast.error("Failed to delete product");
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`http://localhost:3001/adminEditProduct/${productId}`, productData);
            toast.success("Product edited successfully");
            setProductData({
                name: '',
                image: '',
                oldPrice: 0,
                newPrice: 0,
                description: ""
            });
            setProductId('');
            setEditForm(false);
        } catch (error) {
            toast.error("Failed to edit product");
            console.error('Error editing product:', error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/adminAddProduct",  productData );
            toast.success("Product added successfully");
        } catch (error) {
            toast.error("Failed to add product");
            console.error('Error adding product:', error);
        }
        setProductData({
            name: '',
            image: '',
            oldPrice: 0,
            newPrice: 0,
            description: ""
        });
    };

    return (
        <div className="admin-dashboard">
            {isAdmin && Admins.includes(userId) && loginuser === userId ? (
                <div className="admin-content">
                    <h1>Welcome to our Admin Page</h1>
                    <h2>Admin Dashboard</h2>
                    <button className="new-product-btn" onClick={() => setShowForm(!showForm)}>
                        <FaPlus /> New Product
                    </button>
                    {showForm && (
                        <form className="product-form" onSubmit={handleFormSubmit}>
                            <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} />
                            <textarea name="description" placeholder="Product Description" value={productData.description} onChange={handleInputChange}></textarea>
                            <input type="number" name="oldPrice" placeholder="Product New Price" value={productData.oldPrice} onChange={handleInputChange} />
                            <input type="number" name="newPrice" placeholder="Product Old Price" value={productData.newPrice} onChange={handleInputChange} />
                            <input type="url" name="image" placeholder="Product image Url" value={productData.image} onChange={handleInputChange} /> 
                            <button type="submit">Create Product</button>
                        </form>
                    )}
                    <button className="new-product-btn" onClick={() => setEditForm(!editForm)}> <FaPlus /> Edit </button>
                    {editForm && (
                        <form className="product-form" onSubmit={handleEdit}>
                            <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
                            <button type="submit">Edit Product</button>
                        </form>
                    )}
                    <button className="new-product-btn" onClick={() => setDeleteForm(!deleteForm)}> <FaPlus /> Delete </button>
                    {deleteForm && (
                        <form className="product-form" onSubmit={handleDelete}>
                            <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
                            <button type="submit">Delete Product</button>
                        </form>
                    )}
                    <ToastContainer />
                </div>
            ) : (
                <div className="access-denied">
                    <h1>Access Denied For Admin Page</h1>
                    <h2>You're Not an Admin User {userId}</h2>
                    <h3>Please contact Satvik for access</h3>
                </div>
            )}
        </div>
    );
};

export default Admin;