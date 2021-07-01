import { combineReducers } from "redux";
import authReducer from "./authReducers";
import { cartReducer } from "./cartReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cart: cartReducer,
});
