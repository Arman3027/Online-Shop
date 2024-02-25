import axios from "axios";
import { useEffect, useState , useRef,useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProductContext from "../context/context";



const Singleproduct = () => {
  const productcontext = useContext(ProductContext);
  const [user, setuser] = useState({});
  const { id } = useParams();
  const cart_single = useRef({})
  const buy_single = useRef({});

  useEffect(() => {
    async function axi() {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setuser(response.data);
    }
    axi();
  }, []);

  return (
    <>
      <div className="container-single">
        <div className="flex-single">
          <Link to={"/products"}>
            <button className="back-single">back</button>
          </Link>
          <img src={user.image} className="img-single" />
          <div className="info-single">
            <p className="title-single">{user.title}</p>
            <p className="price-single"> price : {user.price}$</p>
            <p className="description-single">{user.description}</p>
          </div>
          <div className="cart-single" ref={cart_single}>
            <button className="submit-single" onClick={(e) => {handlesubmit(user,e.currentTarget)}}>submit</button>
            <p className="count-single">{productcontext.countitem}</p>
            <button className="plus-single" onClick={handleplus}>+</button>
            <button className="mines-single" onClick={handlemines}>-</button>
          </div>
          <button className="buy-single" onClick={(e) => handlebuysingle(user, e.currentTarget)} ref={buy_single}>buy</button>
        </div>
      </div>
    </>
  );
  function handleplus() {
    productcontext.onplus();
  }
  function handlemines() {
    productcontext.onmines();
  }
  function handlebuysingle(user,target) {
    productcontext.onbuysingle(buy_single,cart_single,user,target);
  }
  function handlesubmit(user , target) {
    productcontext.onsubmit(user,target)
  }
};
 
export default Singleproduct;