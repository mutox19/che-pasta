const AdminBro = require("admin-bro");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
//register is the adminbro
AdminBro.registerAdapter(require("@admin-bro/mongoose"));

const myAdminBro = new AdminBro({
  resources: [productModel, userModel, cartModel, orderModel],
  path: "/admin",
});

module.exports.AdminbroPanel = () => {
  return myAdminBro;
};
