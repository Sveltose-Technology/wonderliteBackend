const Companyfeedback = require("../models/companyfeedback");

exports.addcompanyfeedback = async (req, res) => {
  const { user, feedback, rating, sortorder, status } = req.body;

  const newCompanyfeedback = new Companyfeedback({
    user: user,
    feedback: feedback,
    rating: rating,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Companyfeedback.findOne({
    user: user,
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newCompanyfeedback
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newCompanyfeedback,
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

exports.onecompanyfeedback = async (req, res) => {
  const findone = await Companyfeedback.findOne({
    _id: req.params.id,
  }).populate("user");
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

exports.allcompanyfeedback = async (req, res) => {
  const findall = await Companyfeedback.find()
    .sort({ sortorder: 1 })
    .populate("user");
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

exports.editcompanyfeedback = async (req, res) => {
  const findandUpdateEntry = await Companyfeedback.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );
  //.populate("user");
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

exports.delcompanyfeedback = async (req, res) => {
  try {
    const deleteentry = await Companyfeedback.deleteOne({
      _id: req.params.id,
    }).populate("user");
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
