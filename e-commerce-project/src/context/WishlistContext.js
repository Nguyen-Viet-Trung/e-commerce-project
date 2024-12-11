import { createContext, useContext, useEffect, useState } from "react";
import LogInContext from "./LogInContext";
import axios from "axios";
export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const { LoginData } = useContext(LogInContext);
  const username = LoginData?.username || "Username";

  const wishListKey = `wishlist_${username || "guest"}`;
  let storedList = [];

  // Function to fetch product details by product ID
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8080/view/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadWishlist = async () => {
      if (username === "Username") {
        // Load from localStorage if the user is a guest
        storedList = localStorage.getItem(wishListKey) || "[]";
      } else {
        try {
          // Fetch all wishlists and filter by current username
          const response = await axios.get("http://localhost:8080/wishlist");
          const userWishlist = response.data
            .filter((item) => item.username === username) 
            .map((item) => item.product_id);
          storedList = JSON.stringify(userWishlist);
        } catch (error) {
          console.error("Error fetching wishlist from server:", error);
        }
      }

      if (storedList) {
        const productIds = JSON.parse(storedList);
        const products = await Promise.all(
          productIds.map((id) => fetchProductDetails(id))
        );
        const validProducts = products.filter((product) => product !== null);
        setWishlist(validProducts);
        setNumberOfItem(validProducts.length);
      }
    };

    loadWishlist();
  }, [wishListKey, username]);

  useEffect(() => {
    if (username === "Username" && wishlist.length > 0) {
      localStorage.setItem(wishListKey, JSON.stringify(wishlist.map((item) => item.id)));
    } else if (username === "Username") {
      localStorage.removeItem(wishListKey);
    }
  }, [wishlist, wishListKey, username]);

  const addToWishList = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      setNumberOfItem(updatedWishlist.length);

      if (username !== "Username") {
        axios
          .post("http://localhost:8080/wishlist/save", {
            id:username+product.id,
            username:username,
            product_id: product.id,
          })
          .catch((error) => {
            console.error("Error saving wishlist item:", error);
          });
      }
    }
  };

  const removeFromWishList = (productID) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productID);
    setWishlist(updatedWishlist);
    setNumberOfItem(updatedWishlist.length);

    if (username !== "Username") {
      axios
        .delete(`http://localhost:8080/wishlist/delete`, {
          data: { id:username+productID,username:username, product_id: productID },
        })
        .catch((error) => {
          console.error("Error deleting wishlist item:", error);
        });
    }
  };

  const isInWishlist = (productID) => {
    return wishlist.some((item) => item.id === productID);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        numberOfItem,
        addToWishList,
        removeFromWishList,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
