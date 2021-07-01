import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import "../../Screens/screens.css";
import { UserServices } from "../../_services/userServices";
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSet, setAddressSet] = useState(false);
  const [dbAddress, setDbAddress] = useState("");
  const { auth, cart } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    if (cart.length >= 1) {
      UserServices.getUserCartById(auth.user.id).then((res) => {
        setProducts(res.body.products);
        setTotal(res.body.cartTotal);
      });
    }
  }, []);

  const saveAddressToDB = () => {
    var userDetails = {
      address: address,
      id: auth.user.id,
    };
    UserServices.saveUserAddress(userDetails).then((res) => {
      if (res.status === 200) {
        setDbAddress(res.body.address);
        setAddressSet(true);
      }
    });
  };

  const emptyCart = () => {
    //empty localstorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //empty redux cart
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //empty backend
    UserServices.emptyUserCart(auth.user.id).then((res) => {
      setProducts([]);
      setTotal(0);
      swal("Cart Emptied!", "Your Cart has been emptied", "success");
    });
  };

  const createNewOrder = () => {
    var userCreds = {
      id: auth.user.id,
    };
    UserServices.createNewOrder(userCreds).then((res) => {
      if (res.status === 200) {
        emptyCart();
        setProducts([]);
        setTotal(0);
        swal("Order Created!", "New Order Created!", "success");
      }
    });
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <hr />
        Ship To: {dbAddress}
        <hr />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary at-2" onClick={saveAddressToDB}>
          Save
        </button>
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Total Products {products.length}</p>
        <hr />
        <p>List of Products</p>
        {products.map((product, i) => {
          return (
            <div key={i}>
              {product.product.name} X {product.count} = $
              {product.product.price * product.count}
            </div>
          );
        })}
        <hr />
        <p>Cart Total:${total}</p>
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!products.length || !addressSet}
              onClick={createNewOrder}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              onClick={emptyCart}
              disabled={!products.length}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
