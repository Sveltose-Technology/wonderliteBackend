const Role = require("../models/role");

exports.add_role = async (req, res) => {};

exports.addrole = async (req, res) => {
  const { category_name, add_staff, edit_staff, view_staff, delete_staff } =
    req.body;

  const newRole = await new Role({
    category_name: category_name,
    add_staff: add_staff,
    edit_staff: edit_staff,
    view_staff: view_staff,
    delete_staff: delete_staff,
  });

  const findexist = await Role.findOne({ category_name: category_name });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newRole
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};
