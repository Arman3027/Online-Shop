import "../style/style.css";
import { useState , useEffect , useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import ProductContext from "../context/context";


const Products = () => {
  const productcontext = useContext(ProductContext)
  let cart_products = useRef({})
  let buy_products = useRef({});
  let search_products = useRef(null)
  let select_products = useRef(null)
  
  return (
    <>
      <div className="container-products">
        <div className="grid-products">
          <input
            type="text"
            id="search"
            placeholder="search"
            onChange={(e) => {
              handlechange(e.target.value,select_products.current);
            }}
            ref={search_products}
          />
          <select
            ref={select_products}
            className="select-products"
            onChange={(e) => {
              handlegroup(e.target.value , search_products.current);
            }}
          >
            <option value="All">All</option>
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="men's clothing">men's clothing</option>
            <option value="women's clothing">women's clothing</option>
          </select>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="faCart-products"
            onClick={handleactive}
          />
          <div
            className="cartpage-products"
            style={{ display: productcontext.iscart ? "flex" : "none" }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="faCircle-products"
              onClick={handleactive}
            />
            <div className="infoinfo-products">
              <p className="topinfo-products">title</p>
              <p className="topinfo-products">count</p>
              <p className="topinfo-products" id="topcartprice-products">price</p>
              <p className="topinfo-products">total price</p>
            </div>
            <div className="infobuy-products">
              {productcontext.cartitem.length > 0 ? (
                productcontext.cartitem.map((item) => {
                  return (
                    <>
                      <div className="cartitem-products">
                        <p className="itemtitle-products">{item.title}</p>
                        <p className="itemcartitem-products">{item.count}</p>
                        <p className="itemcartitem-products" id="cartprice-products">{item.price}</p>
                        <p className="itemcartitem-products">{item.allprice}</p>
                        <button
                          className="deletecartitem-products"
                          onClick={() => {
                            handledelete(item);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </>
                  );
                })
              ) : (
                <h4 style={{ margin: 40 }}>your shopping basket is empty</h4>
              )}
            </div>
            <div className="cartprice-products">
              price :{" "}
              {productcontext.totalprice === 0
                ? "zero"
                : productcontext.totalprice}
            </div>
          </div>
          {productcontext.filteritem.map((product, index) => {
            return (
              <>
                <div className="item-products" key={index}>
                  <img src={product.image} className="img-products" />
                  <p className="price-products">{product.price}$</p>
                  <p className="title-products">{product.title}</p>
                  <div
                    className="cart-products"
                    ref={(element) => (cart_products.current[index] = element)}
                  >
                    <button
                      onClick={(e) => {
                        handlesubmit(product, e.currentTarget);
                      }}
                      className="submit-products"
                    >
                      submit
                    </button>
                    <p className="count-products">{productcontext.countitem}</p>
                    <button className="plus-products" onClick={handleplus}>
                      +
                    </button>
                    <button className="mines-products" onClick={handlemines}>
                      -
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      handlebuy(product, e.currentTarget);
                    }}
                    className="buy-products"
                    ref={(element) => (buy_products.current[index] = element)}
                  >
                    buy
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
       
  function handlebuy(product ,target) {
    productcontext.onbuy(buy_products, cart_products, product,target);
  }
  function handleplus() {
    productcontext.onplus()
  }
  function handlemines() {
    productcontext.onmines();
  }
  function handlesubmit(product,target) {
    productcontext.onsubmit(buy_products, cart_products, product,target);
    handletotal()
  }
  function handleactive() {
    productcontext.onclick()
  }
  function handledelete(item) {
    productcontext.ondelete(item)
    handletotal()
  }
  function handletotal() {
    productcontext.ontotal()
  }
  function handlechange(value ,select) {
    productcontext.onchange(value,select)
  }
  function handlegroup(value ,search) {
    productcontext.ongroup(value,search)
  }
};

export default Products;
