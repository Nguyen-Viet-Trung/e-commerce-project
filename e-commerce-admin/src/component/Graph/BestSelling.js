import { useEffect, useState } from "react";

export default function BestSelling() {
  const [bestSelling, setBestSelling] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        "http://localhost:8080/admin/trending_products"
      );
      const data = await res.json();
      setBestSelling(data);
    };
    fetchProduct();
  }, []);
  return (
    <div className="bg-white rounded-lg col-span-1 md:col-span-2 p-6 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Best Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Total Sold</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bestSelling.map((item) => {
              return (
                <tr className="font-semibold" key={item.id}>
                  <th>{item.name}</th>
                  <td>{item.brand}</td>
                  <td>{item.sold}</td>
                  <td>${item.sellingPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
