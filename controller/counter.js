const User = require("../models/user");
const Product = require("../models/product");
const Staff = require("../models/staff");
const Brand = require("../models/brand");
const Orderproduct = require("../models/orderproduct");

exports.total_users = (req, res) => {
  User.count({}, function (err, count) {
    console.log("Number of user:", count);
    res.send({ totalUser: count });
  });
};

exports.total_product = (req, res) => {
  Product.count({}, function (err, count) {
    console.log("Number of Product:", count);
    res.send({ totalProduct: count });
  });
};

exports.total_staff = (req, res) => {
  Staff.count({}, function (err, count) {
    console.log("Number of Staff:", count);
    res.send({ totalStaff: count });
  });
};

exports.total_brand = (req, res) => {
  Brand.count({}, function (err, count) {
    console.log("Number of Brand:", count);
    res.send({ totalBrand: count });
  });
};

exports.total_order = (req, res) => {
  Orderproduct.count({}, function (err, count) {
    console.log("Number of Order:", count);
    res.send({ totalOrder: count });
  });
};
