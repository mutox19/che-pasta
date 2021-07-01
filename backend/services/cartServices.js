const constants = require("../constants");
const CartModel = require("../database/models/cartModel");
const UserModel = require("../database/models/userModel");
const ProductModel = require("../database/models/productModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const OrderModel = require("../database/models/orderModel");

module.exports.createCart = async (serviceData) => {
  console.log("CartServices", serviceData.userCreds);

  try {
    checkObjectId(serviceData.userCreds.id);

    let products = [];
    //find a user by its id
    let user = await UserModel.findById(serviceData.userCreds.id);

    //console.log("DBFoundUser,", user._id);

    //check if cart with this logged in user exist
    let cartExistByUser = await CartModel.findOne({
      orderedBy: user._id,
    }).exec();

    //if the cart exist remove the old cart
    if (cartExistByUser) {
      cartExistByUser.remove();
      console.log("deleting old cart");
    }

    //console.log("LengthOFCART", serviceData.userCreds.cart.length);
    for (let i = 0; i < serviceData.userCreds.cart.length; i++) {
      let object = {};

      console.log("currentCartId:", serviceData.userCreds.cart[i]._id);
      object.product = serviceData.userCreds.cart[i]._id;
      object.count = serviceData.userCreds.cart[i].count;

      //get price for creating total / user can modify localstorage and then the price is actually incorrect
      let { price } = await ProductModel.findById(
        serviceData.userCreds.cart[i]._id
      )
        .select("price")
        .exec();
      object.price = price;
      products.push(object);
    }

    //console.log("Cost", );
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    console.log("cartTotal", cartTotal);

    let newCart = await new CartModel({
      products,
      cartTotal,
      orderedBy: user._id,
    });

    let result = await newCart.save();
    console.log("newCart", newCart);
    return formatMongoData(result);
  } catch (error) {
    console.log("something went wrong: SERVICES: CREATE Cart", error);
    throw new Error(error);
  }
};

//services thats gets a Cart by its id
module.exports.getCartById = async ({ id }) => {
  try {
    //check the id passed
    checkObjectId(id);

    //find a user by its id
    let user = await UserModel.findById(id);

    //check if cart with this logged in user exist and populate the data with the actual products field
    let cart = await CartModel.findOne({
      orderedBy: user._id,
    })
      .populate("products.product")
      .exec();

    //throw a error if a cart is not found
    if (!cart) {
      throw new Error(constants.cartMessage.CART_NOT_FOUND);
    }

    //const { products, cartTotal } = cart;
    //helper method to check if it is an array of array of objects
    return formatMongoData(cart);
  } catch (error) {
    console.log("something went wrong: SERVICES: GET Cart BY ID", error);
    throw new Error(error);
  }
};

module.exports.emptyUserCart = async ({ id }) => {
  try {
    //check the id passed
    checkObjectId(id);

    //find a user by its id
    let user = await UserModel.findById(id);

    //check if cart with this logged in user exist
    let cartExistByUser = await CartModel.findOneAndRemove({
      orderedBy: user._id,
    }).exec();

    if (!cartExistByUser) {
      throw new Error(constants.cartMessage.CART_NOT_FOUND);
    }
    //helper method to check if it is an array of array of objects
    return formatMongoData(cartExistByUser);
  } catch (error) {
    console.log("something went wrong: SERVICES: Empty cart", error);
    throw new Error(error);
  }
};

module.exports.saveUserAddress = async (updateInfo) => {
  try {
    console.log("infoPassed:", updateInfo.params);

    //check the id that is passed
    checkObjectId(updateInfo.params.id);

    //find a Product by its id and update it.. then return the Product to the user
    let userAddress = await UserModel.findOneAndUpdate(
      { _id: updateInfo.params.id },
      { address: updateInfo.params.address },
      {
        new: true,
      }
    ).exec();

    //helper method to check if it is an array of array of objects
    return formatMongoData(userAddress);
  } catch (error) {
    console.log("something went wrong: SERVICES: UPDATE address", error);
    throw new Error(error);
  }
};

module.exports.createOrder = async (serviceData) => {
  try {
    console.log(serviceData);

    checkObjectId(serviceData.userCreds.id);

    //find a user by its id
    let user = await UserModel.findById(serviceData.userCreds.id);

    //check if cart with this logged in user exist
    let { products } = await CartModel.findOneAndRemove({
      orderedBy: user._id,
    }).exec();

    //creates a new Product object by adding the service data
    let order = new OrderModel({ products, orderedBy: user._id });

    //saves the new Product to the database
    let result = await order.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("something went wrong: SERVICES: CREATE Order", error);
    throw new Error(error);
  }
};
