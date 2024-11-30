import { useContext } from "react";
import React, { useState } from "react";
import { ProductContext } from "../context/ProductContext";

const SortBy = () => {
  const { sortProduct } = useContext(ProductContext);

  return (
    <div className="mt-4">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort by
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("name-asc")}
            >
              Name
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("hotsold")}
            >
              Best Sellers
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("discount")}
            >
              Discounts
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("newest")}
            >
              New
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("price-asc")}
            >
              Price: Low to High
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("price-desc")}
            >
              Price: High to Low
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortBy;
