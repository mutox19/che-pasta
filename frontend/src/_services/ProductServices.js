import { fetchWrapper } from '../_helpers/fetch_wrapper';
const baseURL = 'http://localhost:3000/api/v1/Products';

export const ProductServices = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
}


function getAllProducts() {
    return fetchWrapper.get(baseURL);
}

function getProductById(id) {
    return fetchWrapper.get(`${baseURL}/${id}`);
}

function createProduct(params) {
    return fetchWrapper.post(baseURL,params);
}

function updateProduct(id, params) {
    return fetchWrapper.put(`${baseURL}/${id}`,params);
}

function deleteProduct(id) {
    return fetchWrapper.delete(`${baseURL}/${id}`);
}