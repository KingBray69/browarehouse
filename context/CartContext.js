import { createContext, useContext, useReducer } from "react";

// Cart state: items = [ { id, name, price, image, description, quantity } ], total = number
const initialState = {
  items: [],
  total: 0,
};

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";

// Reducer logic
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedItems;
      if (existingIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += 1;
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: updatedItems, total: newTotal };
    }
    case REMOVE_ITEM: {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: updatedItems, total: newTotal };
    }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const removeItem = (product) => dispatch({ type: REMOVE_ITEM, payload: product });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  return (
    <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}