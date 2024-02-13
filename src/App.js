import { Route, Routes, Navigate } from "react-router-dom"
import ProductContext from "./context/context";
import Products from "./component/products";
import About from "./component/about";
import Navbar from './component/navbar'
import Login from "./component/login";
import Home from "./component/home";
import "./style/style.css";

const App = () => {
  return (
    <>
      <ProductContext.Provider value={{}}>
          <Navbar />
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/not-found" element={<h1>not found ¯\_ (¬_¬)_/¯</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
      
      </ProductContext.Provider>
    </>
  );
}
 
export default App;