let initialState = [];

//load cart items from local storage
if (typeof window !== "undefined") {
    //if cart is in localstorage GET it
    if (localStorage.getItem("cart")) {
        initialState = JSON.parse(localStorage.getItem("cart"));
    }else {
        initialState = [];
    }
}
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
