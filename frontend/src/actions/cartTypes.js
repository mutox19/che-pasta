/*import axios from "axios";
export const ADD_GROCERY = "ADD_GROCERY";
export const REMOVE_GROCERY = "REMOVE_GROCERY";
export const GET_ERRORS = "GET_ERRORS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";
export const productsList = [];


export function AddGroceryById(id) {
  const action = {
    type: ADD_GROCERY,
    id,
  };

  return action;
}

export function RemoveGroceryById(id) {
  const action = {
    type: REMOVE_GROCERY,
    id,
  };

  return action;
}
export const listProducts = () => async (dispatch) => {
  dispatch({
      type: FETCH_PRODUCTS
  });

  try{
      const { data } = await axios.get('/api/products');
      console.log("fetched", data);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data});
  } catch(err) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message});
  }
};
*/