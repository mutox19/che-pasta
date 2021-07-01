const ProductService = require("../services/productServices");
const constants = require("../constants");

//creates a new Product in the database
module.exports.createProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.body);
    //get the response from the server
    const responseFromServer = await ProductService.createProduct(req.body);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_CREATED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: CREATE new product", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//gets all Product from database
module.exports.getAllProducts = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.body);
    //get the response from the server
    const responseFromServer = await ProductService.getAllProducts(req.query);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: GET ALL product", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//gets Product by id from database
module.exports.getProductById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.body);
    //get the response from the server
    const responseFromServer = await ProductService.getProductById(req.params);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_FETCHED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: GET product BY ID", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//update Product by id from database
module.exports.updateProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.body);
    //get the response from the server
    const responseFromServer = await ProductService.updateProduct({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_UPDATED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: UPDATE product", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//delete Product by id from database
module.exports.deleteProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.body);
    //get the response from the server
    const responseFromServer = await ProductService.deleteProduct(req.params);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_UPDATED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: DELETE product", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};
