import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductCardInCheckout from "../../Components/ProductCardInCheckout/ProductCardInCheckout";
import { UserServices } from "../../_services/userServices";
const Cart = () => {
  const { auth, cart } = useSelector((state) => ({ ...state }));
  
  let history = useHistory();

  const saveOrderToDb = () => {
    var userCreds = {
      cart: cart,
      id: auth.user.id,
    };

    UserServices.userCart(userCreds)
      .then((res) => {
        if (res.status === 200) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("cart save error", err));
  };
  //
  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Quantity</th>
            <th scope="col"># reviews</th>
            <th scope="col">Rating</th>
            <th scope="col">Remove from cart</th>
          </tr>
        </thead>

        {cart.map((p) => {
          return <ProductCardInCheckout key={p._id} p={p} />;
        })}
      </table>
    );
  };
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h3> Cart / {cart.length} Product</h3>
          {!cart.length ? (
            <p>
              No Products in cart. <Link to={"/"}>Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h3>Order Summary</h3>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => {
            return (
              <div key={i}>
                <p>
                  {c.name} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            );
          })}
          <hr />
          Total <b>${getTotal()}</b>
          <hr />
          {auth.isAuthenticated ? (
            <button disabled={!cart.length} onClick={saveOrderToDb}>
              Proceed to checkout
            </button>
          ) : (
            <Link
              to={{
                pathname: "/login",
                state: { from: "cart" },
              }}
            >
              Log in to checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
