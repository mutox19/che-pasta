import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch();
  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleRemove = () => {
    //console.log();
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <img
            src={require(`../../images/${p.image}`).default}
            alt="product_image"
            style={{ height: 100, width: 100 }}
          />
        </td>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td className="text-center">
          <input
            type="number"
            className="control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>{p.numReviews}</td>
        <td>{p.rating}</td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
