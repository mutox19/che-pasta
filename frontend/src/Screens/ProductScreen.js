import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function ProductScreen(props) {
  const [product, setProduct] = useState("");
  const [image, setImage] = useState(props.location.state.image);
  const [quantityVal, setQuantityVal] = useState(1);

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  console.log(props);
  useEffect(() => {
    setProduct(props.location.state);
  });

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    setQuantityVal(count);
  };
  function addCart(product) {
    //console.log(id);
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new item to cart
      cart.push({
        ...product,
        count: quantityVal,
      });

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      console.log("unqiue", unique);
      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      
      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  }

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={require(`../images/${props.location.state.image}`).default} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Precio: <b>${product.price}</b>
            </li>
            <li>
              Descripción:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Precio: {product.price * quantityVal}</li>
            <li>Status: {product.status}</li>
            <li>
              Cantidad:{" "}
              <input
                type="number"
                className="control"
                value={quantityVal}
                onChange={handleQuantityChange}
              />
            </li>
            <li>
              <button className="button" onClick={() => addCart(product)}>
                <b>Añadir al Carrito</b>
              </button>
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
