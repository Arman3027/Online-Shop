import { Route, Routes, Navigate } from "react-router-dom"
import { useState, useEffect  } from "react";
import ProductContext from "./context/context";
import Products from "./component/products";
import About from "./component/about";
import Navbar from './component/navbar'
import Login from "./component/login";
import Home from "./component/home";
import "./style/style.css";
import axios from "axios";
import Singleproduct from "./component/singleproduct";

const App = () => {
  const [itemProducts, setProducts] = useState([]);
  const [countitem, setcount] = useState(0);
  const [cartitem, setcartitem] = useState([])
  const [iscart, setiscart] = useState(false)
  const [totalprice, settotal] = useState(0)
  const [filteritem, setfilteritem] = useState([])

  useEffect(() => {
    async function getItem() {
      let response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setfilteritem(response.data)
    }
    getItem();
  }, []);

  return (
    <>
      <ProductContext.Provider
        value={{
          itemProducts: itemProducts,
          onbuy: handlebuy,
          onbuysingle:handlebuysingle,
          onplus: handleplus,
          onmines: handlemines,
          onsubmit: handlesubmit,
          onclick: handleactive,
          ondelete: handledelete,
          onchange: handlechange,
          ongroup: handlegroup,
          countitem: countitem,
          cartitem: cartitem,
          iscart: iscart,
          totalprice: totalprice,
          filteritem:filteritem,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Singleproduct />} />
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
  function handlebuy(buy_products, cart_procuts, product, target) {
    let allbuy = buy_products.current
    let allcart = cart_procuts.current
    let arrallbuy = [...Object.values(allbuy)];
    let arrallcart = [...Object.values(allcart)]
    let brother = target.parentElement.childNodes[3]
    arrallbuy.forEach((element) => {
      if (element !== null) { element.style.display = 'unset' }
    })
    arrallcart.forEach((element) => {
      if (element !== null) { element.style.display = 'none' }
    })
    target.style.display = 'none'
    brother.style.display = 'flex'
    setcount(0);
  }
  function handlebuysingle(buy_single, cart_single, user, target) {
    let brother = target.parentElement.childNodes[3]
    target.style.display = "none";
    brother.style.display = "flex";
    setcount(0)
  }
  function handleplus() {
    let newcount = countitem + 1
    setcount(newcount)
    return countitem
  }
  function handlemines() {
    if (countitem > 0) {
      let newcount = countitem - 1;
      setcount(newcount);
      return countitem;
    }
  }
  function handlesubmit(product,target) {
    let brother = target.parentElement.parentElement.childNodes[4]
    brother.style.display = "unset";
    target.parentElement.style.display = "none";

    let item = 
      {
        title: product.title,
        count: countitem,
        price: product.price,
        allprice: product.price * countitem,
      }
  
    if (item.allprice !== 0) {
      let another = [...cartitem]
      another.push(item)
      console.log(another);
      setcartitem(another)
    let newtotal = 0;
    for (const x of another) {
      newtotal += x.allprice;
    }
    settotal(newtotal);
    }
    setcount(0)
  }
  function handleactive() {
    if (iscart === false) {
      setiscart(true)
    } else {
      setiscart(false)
    }
  }
  function handledelete(item) {
    let another=[...cartitem]
    let index = cartitem.indexOf(item)
    another.splice(index, 1)
      console.log(another);
    setcartitem(another)
    let newtotal = 0;
    for (const x of another) {
      newtotal += x.allprice;
    }
    settotal(newtotal);
  }
  function handlechange(value, select) {
    let newfilteritem;
    if (select.value === 'All') {
      newfilteritem = itemProducts.filter((item) => item.title.toString().toLowerCase().includes(value.toLowerCase()))
      setfilteritem(newfilteritem)
    } else if (select.value === "electronics") {
      newfilteritem = itemProducts.filter((item) => item.title.toString().toLowerCase().includes(value.toLowerCase()) && item.category === 'electronics')
      setfilteritem(newfilteritem)
    } else if (select.value === "jewelery") {
      newfilteritem = itemProducts.filter((item) => item.title.toString().toLowerCase().includes(value.toLowerCase()) && item.category === 'jewelery')
      setfilteritem(newfilteritem)
    } else if (select.value === "men's clothing") {
      newfilteritem = itemProducts.filter((item) => item.title.toString().toLowerCase().includes(value.toLowerCase()) && item.category === "men's clothing")
      setfilteritem(newfilteritem)
    } else if (select.value === "women's clothing") {
      newfilteritem = itemProducts.filter((item) => item.title.toString().toLowerCase().includes(value.toLowerCase()) && item.category === "women's clothing")
      setfilteritem(newfilteritem)
    }
  }
  function handlegroup(value,search) {
    search.value = ''
    let newfilteritem = itemProducts.filter((item) => {
      if (value === 'All') {
        return itemProducts
      } else {
        return item.category === value;
      }
    })
    setfilteritem(newfilteritem)
  }
}

 
export default App;