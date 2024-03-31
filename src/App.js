import { Route, Routes } from "react-router-dom";
import CategoryProduct from "./components/CategoryProduct";
import CategoryMaster from "./components/categoryMaster/CategoryMaster";
import ProductMaster from "./components/productMaster/ProductMaster";


function App() {
  return (
    <Routes>
      <Route path="/" element={<CategoryProduct />} />
      <Route path="/category" element={<CategoryMaster />} />
      <Route path="/product" element={<ProductMaster />} />
    </Routes>
  );
}

export default App;
