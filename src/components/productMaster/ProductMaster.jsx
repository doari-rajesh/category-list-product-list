import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductMaster = () => {
  const [product, setProduct] = useState({
    productName: "",
    categoryid: "",
  });
  const [category, setCategory] = useState([]);
  console.log("category: ", category);

  // const BASE_URL = process.env.REACT_APP_BASE_URL + "/createProduct";
  // console.log(process.env);
  // console.log("url", BASE_URL);

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("product: ", product);
    const { productName, categoryid } = product;
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/product/createProduct`,
        {
          productName,
          categoryid,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
    setProduct({
      productName: "",
      categoryid: "",
    });
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/category/getCategories"
      );
      console.log(response?.data?.categories);
      setCategory(response?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form style={{ width: "30%" }}>
          <label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                Enter Product name <sup>*</sup>
              </p>
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleOnChange}
                required
                placeholder="Enter product name"
                style={{ width: "50%", padding: "5px" }}
              />
            </div>
          </label>

          <select
            name="categoryid"
            value={category.id}
            onChange={handleOnChange}
          >
            <option value="">select category</option>
            {category.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.categoryName}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            style={{ marginTop: "20px" }}
            onClick={handleOnSubmit}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductMaster;
