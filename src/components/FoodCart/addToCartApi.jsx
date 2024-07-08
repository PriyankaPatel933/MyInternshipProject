
export const addToCartAPI = async (food) => {
    const requestData = {
      EventID: '1005', // Replace with actual event ID if different
      addInfo: {
        ProductId: food.productId,
        Total: food.price * food.quantity // Adjust according to your needs
      }
    };
  
    try {
      const response = await fetch('http://localhost:5167/cartService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (data.result && data.result.rData && data.result.rData.rCode === 0) {
        return { success: true, message: data.result.rData.rMessage };
      } else {
        return { success: false, message: data.result.rData.rMessage };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  