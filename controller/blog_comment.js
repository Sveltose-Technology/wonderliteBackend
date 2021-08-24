//const blog = require("../models/blog");
const commentBlog = require("../models/blog_comment");
//const blog = require("../models/blog");

exports.add_comment = async (req, res) => {
  const { blogId, name, email, website, comment } = req.body;

  const newcommentBlog = new commentBlog({
    blogId: blogId,
    name: name,
    email: email,
    website: website,
    comment: comment,
  });

  newcommentBlog.save((err, resp) => {
    if (err) {
      res.json({ code: 400, msg: "comment is not add" });
    } else {
      newcommentBlog.updateOne(
        { _id: req.params.blogId },
        { $push: { comment: resp._id }, $inc: { comment_count: 1 } },
        (err, resp) => {
          if (err) {
            res.json({ code: 400, msg: "comment not add in blog" });
            console.log(err);
          } else {
            res.json({ code: 200, msg: "comment add successfully" });
          }
        }
      );
    }
  });
};

//   const findexist = await Commentblog.findOne({ email: email });
//   if (findexist) {
//     res.status(400).json({
//       status: false,
//       msg: "Already Exists",
//       data: {},
//     });
//   } else {
//     newCommentblog
//       .save()
//       .then(
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: newCommentblog,
//         })
//       )
//       .catch((error) => {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: error,
//         });
//       });
//   }
// };

const removeOne = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(204).json({
      message: "Item successfully deleted",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.all_comment = async (req, res) => {
  const findall = await commentBlog.find().sort({ sortorder: 1 });
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
    const deleteentry = await commentBlog.deleteOne({ _id: req.params.id });
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
