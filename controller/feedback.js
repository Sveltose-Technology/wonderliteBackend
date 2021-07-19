const Feedback = require("../models/feedback");

exports.addfeedback = async (req, res) => {
  const { user, feedback, product, sortorder, status } = req.body;

  const newFeedback = new Feedback({
    user: user,
    feedback: feedback,
    product: product,
    sortorder: sortorder,
    status: status,
  });
  const findexist = await Feedback.findOne({
    user: user,
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newFeedback
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newFeedback,
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

exports.onefeedback = async (req, res) => {
  const findone = await Feedback.findOne({ _id: req.params.id })
    .populate("user")
    .populate("product");
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

// exports.onefeedback = async (req, res) => {
//   const findone = await Feedback.findOne({ _id: req.params.id }).populate(
//     "user"
//   );
//   if (findone) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findone,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

exports.allfeedback = async (req, res) => {
  const findall = await Feedback.find()
    .sort({ sortorder: 1 })
    .populate("user")
    .populate("product");
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

exports.editfeedback = async (req, res) => {
  const findandUpdateEntry = await Feedback.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .populate("user")
    .populate("product");
  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.deletefeedback = async (req, res) => {
  try {
    const deleteentry = await Feedback.deleteOne({ _id: req.params.id })
      .populate("user")
      .populate("product");
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
