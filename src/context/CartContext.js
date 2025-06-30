// context/CartContext.jsx
import React, { createContext, useReducer } from 'react';

const initialCart = {
  items: [], // [{ productId, quantity, price }]
  totalQuantity: 0,
  totalPrice: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existing = state.items.find((i) => i.productId === product._id);
      let newItems;
      if (existing) {
        newItems = state.items.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          { productId: product._id, quantity, price: product.price }
        ];
      }
      const totalQty = newItems.reduce((sum, i) => sum + i.quantity, 0);
      const totalP = newItems.reduce((sum, i) => sum + i.quantity * i.price, 0);
      return { items: newItems, totalQuantity: totalQty, totalPrice: totalP };
    }
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      const newItems = state.items.filter((i) => i.productId !== productId);
      const totalQty = newItems.reduce((sum, i) => sum + i.quantity, 0);
      const totalP = newItems.reduce((sum, i) => sum + i.quantity * i.price, 0);
      return { items: newItems, totalQuantity: totalQty, totalPrice: totalP };
    }
    case 'CLEAR_CART':
      return initialCart;
    default:
      return state;
  }
}

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}