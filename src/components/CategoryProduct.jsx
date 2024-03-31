import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [previous, setPrevious] = useState();
  const [page, setPage] = useState(1);
  const [length, setLength] = useState();
  console.log("length", length);

  let pageExceed;
  pageExceed = length / 10;
  console.log(pageExceed);
  console.log("category", category);
  console.log("product", product);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/category/getCategories"
      );
      setCategory(response?.data?.categories);
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/getProducts?page=${page}`
      );
      console.log("product res", response);
      setProduct(response?.data?.data);
      setPrevious(response?.data?.previous);
      setLength(response?.data?.productLength);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, [page]);

  return (
    <>
      <div className="category-list">
        <div>
          <h1 style={{ textAlign: "center" }}>Category List</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <ol style={{}}>
              {category.length > 0
                ? category.map((category) => {
                    return <li key={category.id}>{category.categoryName}</li>;
                  })
                : "No Categories"}
            </ol> */}
            <table style={{ width: "300px" }}>
              <thead>
                <th>{<h2>No</h2>}</th>
                <th>{<h2>Category</h2>}</th>
              </thead>
              {category.length > 0
                ? category.map((category, i) => {
                    return (
                      <>
                        <tr key={category.id}>
                          {<td>{i + 1}</td>}
                          {<td key={category.id}>{category.categoryName}</td>}
                        </tr>
                      </>
                    );
                  })
                : "No Categories"}
            </table>
          </div>
        </div>
      </div>
      <div className="product-list" style={{ margin: "20px", padding: "10px" }}>
        <h1 style={{ textAlign: "center" }}>Product List</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={{ width: "700px" }}>
            <thead>
              <tr>
                <th>{<h2>Product No</h2>}</th>
                <th>{<h2>Product Name</h2>}</th>
                <th>{<h2>Category Name</h2>}</th>
                <th>{<h2>Category No</h2>}</th>
              </tr>
            </thead>

            {product.map((product) => {
              console.log(product);
              return (
                <>
                  {/* <div>
                  <span>{product.id}</span>
                  <span>{product.productName}</span>
                </div> */}

                  <tr>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>
                      {product.Category ? product.Category.categoryName : ""}
                    </td>
                    <td>{product.CategoryId}</td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>

        {/* for pagination content - pages and total data  */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            marginTop: "5%",
          }}
        >
          {previous ? (
            <button onClick={() => setPage(previous)}>{previous}</button>
          ) : (
            ""
          )}
          {product.length > 0 ? (
            <>
              <span>{`page ${page}`}</span>
              {pageExceed > page ? (
                <>
                  {
                    <button onClick={() => setPage(page + 1)}>
                      {page + 1}
                    </button>
                  }
                  / {length}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
