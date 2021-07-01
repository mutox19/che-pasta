const constants = require("../constants");
const ProductModel = require("../database/models/productModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");

module.exports.createProduct = async (serviceData) => {
  try {
    //creates a new Product object by adding the service data
    let product = new ProductModel({ ...serviceData });

    //saves the new Product to the database
    let result = await product.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("something went wrong: SERVICES: CREATE Product", error);
    throw new Error(error);
  }
};

module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
  try {
    //find all Products and add a skip and limit for pagination purposes
    let products = await ProductModel.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    //helper method to check if it is an array of array of objects
    return formatMongoData(products);
  } catch (error) {
    console.log("something went wrong:  SERVICES: GET ALL products", error);
    throw new Error(error);
  }
};

//services thats gets a Product by its id
module.exports.getProductById = async ({ id }) => {
  try {
    //check the id passed
    checkObjectId(id);

    //find a Product by its id
    let product = await ProductModel.findById(id);

    //throw a error if a Training is not found
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    //helper method to check if it is an array of array of objects
    return formatMongoData(product);
  } catch (error) {
    console.log("something went wrong: SERVICES: GET Product BY ID", error);
    throw new Error(error);
  }
};

module.exports.updateProduct = async ({ id, updateInfo }) => {
  try {
    //check the id that is passed
    checkObjectId(id);

    //find a Product by its id and update it.. then return the Product to the user
    let product = await ProductModel.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    //helper method to check if it is an array of array of objects
    return formatMongoData(product);
  } catch (error) {
    console.log("something went wrong: SERVICES: UPDATE Product", error);
    throw new Error(error);
  }
};

module.exports.deleteProduct = async ({ id }) => {
  try {
    //check the id that is passed
    checkObjectId(id);

    //find a Product by its id and delete it.. then return the Product to the user
    let product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    //helper method to check if it is an array of array of objects
    return formatMongoData(product);
  } catch (error) {
    console.log("something went wrong: SERVICES: DELETE product", error);
    throw new Error(error);
  }
};
