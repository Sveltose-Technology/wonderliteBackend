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

exports.rating = function (req, res, next) {
  const score = (p, n) => {
    if (p === 0 && n === 0) {
      return 0;
    }
    const r =
      ((p + 1.9208) / (p + n) -
        (1.96 * Math.sqrt((p * n) / (p + n) + 0.9604)) / (p + n)) /
      (1 + 3.8416 / (p + n));
    return Number(r.toFixed(2));
  };

  const rate = (rating) => {
    const size = rating.length;

    let n = rating[0];
    let p = rating[size - 1];

    const step = (1 / (size - 1)).toFixed(2);
    const totalStep = size - 1;
    for (let i = 1; i < totalStep; i++) {
      const ep = (step * i).toFixed(2);
      p += rating[i] * ep;
      n += rating[totalStep - i] * ep;
    }
    return score(p, n);
  };

  const average = (rating) => {
    const total = rating.reduce((prev, current) => {
      return prev + current;
    }, 0);

    if (total === 0) {
      return 0;
    }

    let sum = 0;
    let k = 1;
    rating.forEach((item) => {
      sum += item * k;
      k++;
    });
    const r = sum / total;
    return Number(r.toFixed(1));
  };
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
