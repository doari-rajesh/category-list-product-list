import axios from "axios";
import React, { useState } from "react";

const CategoryMaster = () => {
  const [categoryName, setCategoryName] = useState([""]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("categoryName: ", categoryName);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/category/createCategory",{
          categoryName: categoryName
        }
      );
    } catch (error) {}
    setCategoryName("");
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
                Enter Category name <sup>*</sup>
              </p>
              <input
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                placeholder="Enter Category"
                style={{ width: "50%", padding: "5px" }}
              />
            </div>
          </label>
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

export default CategoryMaster;
