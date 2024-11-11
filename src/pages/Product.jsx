import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState([]);

  const handleDelete = (productId) => {
    console.log(process.env.REACT_APP_URL);
    const deleteProduct = async () => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/products/${productId}`,
          {
            headers: {
              "Allow-Control-Allow-Origin": "*",
            },
          }
        );
        setProducts(products.filter((product) => product.id !== productId));
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    deleteProduct();
  };

  useEffect(() => {
    // Fetch the list of products from your API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products`,
          {
            headers: {
              "Allow-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap:
            "wrap" /* Allows cards to wrap if the screen is too small */,
          justifyContent: "center" /* Centers cards horizontally */,
          alignItems:
            "center" /* Centers cards vertically (if they don't fill the full height) */,
          gap: "20px" /* Space between cards */,
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </>
  );
}
