import React, { useEffect, useState } from 'react';
import "./pay.css"

const GetAllPaymentDetails = () => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    const fetchPaymentDetails = async () => {
        const requestData = {
            EventID: "1002",
            addInfo: {},
        };

        try {
            const response = await fetch("http://localhost:5167/getAllpayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch payment details.");
            }

            const data = await response.json();
            console.log("API response data:", data);

            if (data.result.rStatus === 0) {
                // Assuming rStatus 0 indicates success and data is structured as expected
                setPaymentDetails(data.result.rData.Menu);
            } else {
                throw new Error(data.result.rMessage || "Failed to fetch payment details.");
            }
        } catch (error) {
            setError(error.message || "An error occurred while trying to fetch payment details.");
            console.error("Error fetching payment details:", error);
        }
    };

    if (error) {
        return <div className="error-message">Error: {error}</div>; // Render error message if there's an error
    }

    return (
        <div className="payment-details-container">
            <h2>Payment Details List</h2>
            <table className="payment-details-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        
                        <th>SubTotal</th>
                        <th>Tax</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentDetails.length > 0 ? (
                        paymentDetails.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.user_id}</td>
                                <td>{payment.email}</td>
                               
                                <td>{payment.subTotal}</td>
                                <td>{payment.tax}</td>
                                <td>{payment.totalAmount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No payment details found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllPaymentDetails;
