const User = require("../models/user");
const Product = require("../models/product");
const Staff = require("../models/staff");

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
