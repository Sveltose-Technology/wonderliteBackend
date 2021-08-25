const Blog = require("../models/blog");

exports.addblog = async (req, res) => {
  const { blog_title, blog_category, comments } = req.body;

  const newBlog = new Blog({
    blog_title: blog_title,
    blog_category: blog_category,
    comments: comments,
  });

  const findexist = await Blog.findOne({ blog_title: blog_title });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newBlog
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newBlog,
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

exports.allblog = async (req, res) => {
  const findall = await Blog.find().sort({ sortorder: 1 });
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

exports.delblog = async (req, res) => {
  try {
    const deleteentry = await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};
