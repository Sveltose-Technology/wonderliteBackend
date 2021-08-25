const CommentBlog = require("../models/blog_comment");

exports.add_comment = async (req, res) => {
  const { blogId, name, email, website, comment } = req.body;

  const newCommentBlog = new CommentBlog({
    blogId: blogId,
    name: name,
    email: email,
    website: website,
    comment: comment,
  });

  const findexist = await CommentBlog.findOne({ email: email });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newCommentBlog
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newCommentBlog,
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

exports.delete_comment = async (req, res) => {
  try {
    const deleteentry = await CommentBlog.deleteOne({ _id: req.params.id });
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
