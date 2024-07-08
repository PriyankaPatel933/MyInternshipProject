import React, { useState, useEffect } from 'react';
import "./MyOrders.css"; // Make sure your CSS file path is correct
import { assets } from '../../assets/assets'; // Assuming this import is correctly configured

const MyOrders = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulating fetching orders from an API or source
        const fetchOrders = async () => {
            try {
                // Replace this with actual fetch logic
                const response = await fetch('https://api.example.com/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const orders = await response.json();
                setData(orders); // Assuming orders is an array of order objects
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []); // Empty dependency array ensures it only runs once on component mount

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <img src={assets.parcel_icon} alt="Parcel Icon" />

            <div className="container">
                
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <p>
                            {order.items.map((item, i) => (
                                <span key={i}>
                                    {item.name} X {item.quantity}
                                    {i === order.items.length - 1 ? '' : ','}
                                </span>
                            ))}
                        </p>

                    </div>
                ))}
                {data.length === 0 && (
                    <p>No orders found.</p>
                )}
            </div>
            <div className="list">
            <p>Amount</p>
            <p>Items</p>


            <button>Track Order</button>
            </div>
         

        </div>

    );
};

export default MyOrders;
