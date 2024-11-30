import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { EmbeddedVideo } from "../components/EmbeddedVideo";
function Home() {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <Banner></Banner>
      <ProductList></ProductList>
      <EmbeddedVideo></EmbeddedVideo>
      <Footer></Footer>
    </div>
  );
}
export default Home;
