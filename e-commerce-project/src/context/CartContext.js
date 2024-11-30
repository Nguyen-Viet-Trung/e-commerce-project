import { createContext, useState, useEffect, useContext } from "react";
import LogInContext from "./LogInContext";
import { ProductContext } from "./ProductContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { LoginData } = useContext(LogInContext); // Access the logged-in user's data
  const { username } = LoginData;
  const {productAvailable} = useContext(ProductContext);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const cartKey = username === "Username" ? "cart_guest" : `cart_${username}`;

  // Load cart from localStorage for the logged-in user when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
      setNumberOfProduct(JSON.parse(storedCart).length); // update number of products in navbar cart for each user
    }
  }, [cartKey]);

  useEffect(() => {
    if (cartItem.length > 0) {
      localStorage.setItem(cartKey, JSON.stringify(cartItem));
    } else {
      localStorage.removeItem(cartKey);
    }
  }, [cartItem, cartKey]);

  const addToCart = (product, quantity) => {
    setCartItem((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.id === product.id && item.color === product.color
      );

      // Find availability for the selected color
      const availabilityForColor = productAvailable.find(
        (p) => p.productID === product.productID && p.color === product.color
      )?.available || 0;

      // Check if requested quantity exceeds available stock
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + quantity;
        if (totalQuantity > availabilityForColor) {
          alert(
            `The quantity you selected exceeds the available stock for this color. Choose again.`
          );
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: totalQuantity }
            : item
        );
      } else {
        if (quantity > availabilityForColor) {
          alert(
            `The quantity you selected exceeds the available stock for this color. Choose again.`
          );
          return prevItems;
        }
        setNumberOfProduct(numberOfProduct + 1);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, color, amount) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.productID === productId && item.color === color
          ? {
              ...item,
              quantity: Math.min(
                Math.max(item.quantity + amount, 1),
                productAvailable.find(
                  (p) => p.productID === productId && p.color === color
                ).available
              ),
            }
          : item
      )
    );
  };

  const removeItem = (productId, color) => {
    setCartItem((prevItems) =>
      prevItems.filter((item) => !(item.productID === productId && item.color === color))
    );
    setNumberOfProduct(numberOfProduct - 1);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItem,
        setCartItem,
        updateCartQuantity,
        removeItem,
        numberOfProduct,
        setNumberOfProduct,
        cartKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;

