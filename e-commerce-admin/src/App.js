import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SidebarProvider } from "./context/SidebarContext";

import React, { useContext } from "react";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import LoginPage from "./pages/LogInPage";
import LoginContext, { LoginProvider } from "./context/LoginContext";
import Reviews from "./pages/Review";
import PrivateRoute from "./util/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Products from "./pages/Product/Product";
import { ProductsProvider } from "./context/ProductContext";
import AddProducts from "./pages/Product/AddProduct";
import OrderManagement from "./pages/Order/OrderManagement";
import OrderDetails from "./pages/Order/OrderDetail";
import EditProduct from "./pages/Product/EditProduct";
import AddAvailable from "./pages/Product/AddAvailable";
import AddInfo from "./pages/Product/AddInfo";
function App() {
  const { LoginData, url } = useContext(LoginContext);

  return (
    <LoginProvider>
      <SidebarProvider>
        <ProductsProvider>
          <div className="max-h-screen flex flex-col">
            <Navbar />
            <div className="sm:grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-[#F5F5F5] min-h-[calc(100vh-64px)]">
              {LoginData.loginState && url !== "/login" && <Sidebar />}
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard></Dashboard>
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route
                  path="/reviews"
                  element={
                    <PrivateRoute>
                      <Reviews></Reviews>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/user"
                  element={
                    <PrivateRoute>
                      <User />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/product"
                  element={
                    <PrivateRoute>
                      <Products></Products>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/product/add-product"
                  element={
                    <PrivateRoute>
                      <AddProducts></AddProducts>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <OrderManagement></OrderManagement>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/orders/:id"
                  element={
                    <PrivateRoute>
                      <OrderDetails></OrderDetails>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/product/:id"
                  element={
                    <PrivateRoute>
                      <EditProduct></EditProduct>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/product/available"
                  element={
                    <PrivateRoute>
                      <AddAvailable></AddAvailable>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/product/product-info"
                  element={
                    <PrivateRoute>
                      <AddInfo></AddInfo>
                    </PrivateRoute>
                  }
                ></Route>
              </Routes>
            </div>
          </div>
        </ProductsProvider>
      </SidebarProvider>
    </LoginProvider>
  );
}

export default App;
