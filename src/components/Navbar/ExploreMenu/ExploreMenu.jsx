
import React, { useState, useEffect } from 'react';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    const [foodsList, setFoodsList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        const requestData = {
            EventID: '1005',
            addInfo: {},
        };

        try {
            const response = await fetch('http://localhost:5167/getAllMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch foods. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API response data:', data);

            if (data.result && data.result.rData && data.result.rData.rCode === 0) {
                setFoodsList(data.result.rData.Menu || []);
                setError(null);
            } else {
                throw new Error(data.result.rMessage || 'Foods not found!!');
            }
        } catch (error) {
            setError(error.message || 'An error occurred while trying to fetch foods.');
            console.error('Error fetching foods:', error);
        }
    };

    const renderImage = (base64Image, name) => {
        if (!base64Image) {
            console.error(`Empty base64Image for ${name}`);
            return null;
        }
        return base64Image; // Assuming base64Image already starts with 'data:image/png;base64,'
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>
                Food is art, and food is love. So we have many options. Choose them according to your taste.
                We should show love and appreciation for those who cook it by eating it with relish.
            </p>

            <div className='explore-menu-list'>
                {foodsList.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.name ? 'All' : item.name)}
                        key={index}
                        className='explore-menu-list-item'
                    >
                        <img
                            className={category === item.name ? 'active' : ''}
                            src={renderImage(item.image, item.name)}
                            alt={item.name}
                        />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <hr />
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
};

export default ExploreMenu;



