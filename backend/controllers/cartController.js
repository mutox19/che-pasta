const CartService = require("../services/cartServices");
const constants = require("../constants");

//creates a new cart in the database
module.exports.createCart = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    //console.log("PassedCarts",req.body);
    //get the response from the server
    const responseFromServer = await CartService.createCart(req.body);
    response.status = 200;
    response.message = constants.cartMessage.CART_CREATED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: CREATE new cart", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//gets Product by id from database
module.exports.getCartByUserId = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.params);
    //get the response from the server
    const responseFromServer = await CartService.getCartById(req.params);
    response.status = 200;
    response.message = constants.cartMessage.CART_FETCHED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: GET cart BY ID", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//update Product by id from database
module.exports.emptyUserCart = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log(req.params);
    //get the response from the server
    const responseFromServer = await CartService.emptyUserCart(req.params);
    response.status = 200;
    response.message = constants.cartMessage.CART_DELETED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: empty cart", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

//update User Address by id from database
module.exports.saveUserAddress = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    //.log("in cartController",req.body);
    //get the response from the server

    const responseFromServer = await CartService.saveUserAddress(req.body);
    response.status = 200;
    response.message = constants.userMessage.USER_ADDRESS_CREATED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: save address", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};

module.exports.createOrder = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    console.log("CreateOrdedCalled", req.body);
    //get the response from the server
    const responseFromServer = await CartService.createOrder(req.body);
    response.status = 200;
    response.message = constants.orderMessage.ORDER_CREATED;
    response.body = responseFromServer;
  } catch (error) {
    console.log("something went wrong: CONTROLLER: CREATE new Order", error);
    response.status = 400;
    response.message = error.message;
    response.body = {};
  }

  return res.status(response.status).send(response);
};
