const Returnandexchange = require("../models/returnandexchange");

exports.add_returnandexchange = async (req, res) => {
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
