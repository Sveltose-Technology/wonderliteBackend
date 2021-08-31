const Shophasproduct = require("../models/shophasproduct");

exports.add_comment = async (req, res) => {
  const { product_title, productID, sortorder } = req.body;

  const newShophasproduct = new Shophasproduct({
    product_title: product_title,
    productID: productID,
    sortorder: sortorder,
  });

  const findexist = await CommentBlog.findOne({ product_title: product_title });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newShophasproduct
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newShophasproduct,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.all_comment = async (req, res) => {
  const findall = await CommentBlog.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.allcommentby_blog = async (req, res) => {
  const findall = await CommentBlog.find({
    blogId: req.params.id,
  }).sort({ sortorder: 1 });

  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
