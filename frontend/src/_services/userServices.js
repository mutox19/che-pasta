import { fetchWrapper } from '../_helpers/fetch_wrapper';
const baseURL = 'http://localhost:3000/api/v1/users'

export const UserServices = {
  userCart,
  getUserCartById,
  emptyUserCart,
  saveUserAddress,
  createNewOrder
}

function userCart(userCreds){
    return fetchWrapper.post(`${baseURL}/cart`, {userCreds})
}
function getUserCartById(id) {
    return fetchWrapper.get(`${baseURL}/cart/${id}`);
}
function emptyUserCart(id) {
    return fetchWrapper.delete(`${baseURL}/cart/${id}`);
}
function saveUserAddress(params) {
    return fetchWrapper.post(`${baseURL}/address`,{params});
    
}
function createNewOrder(userCreds) {
    return fetchWrapper.post(`${baseURL}/order`,{userCreds});
}
