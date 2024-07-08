import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  cartItems: {}
};

// Create context
const CartContext = createContext(initialState);

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.id]: (state.cartItems[action.payload.id] || 0) + 1,
        }
      };
    case 'REMOVE_FROM_CART':
      const updatedCartItems = { ...state.cartItems };
      if (updatedCartItems[action.payload.id] > 0) {
        updatedCartItems[action.payload.id] -= 1;
        if (updatedCartItems[action.payload.id] === 0) {
          delete updatedCartItems[action.payload.id];
        }
      }
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
