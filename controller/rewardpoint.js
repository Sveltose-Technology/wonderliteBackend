const Rewardpoint = require("../controller/rewardpoint");
exports.add_rewardpoint = async (req, res) => {
  const {
    reward_title,
    reward_percent,
    applicable_till,
    expiry_date,
    type,
    reward_point,
    user_id,
    order_id, //technician = wiremen,electrician
  } = req.body;
  //reawrd title
  //reward percent
  //applicable till
  //expiry date
  //type (customer,tchnician,user type)

  const newRewardpoint = new Rewardpoint({
    reward_title: reward_title,
    reward_percent: reward_percent,
    applicable_till: applicable_till,
    expiry_date: expiry_date,
    type: type,
    reward_point: reward_point,
    user_id: user_id,
    order_id: order_id,
  });

  if (type == technician) {
    const findexist = await Rewardpoint.findOne(
      { reward_title: reward_title },
      { technicianID: technicianID }
    );
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
      Rewardpoint.save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: true,
            msg: "success",
            data: newRewardpoint,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    }
  }
};

//   newRewardpoint.save(function (err, data) {
//     if (err) {
//       res.status(400).json({
//         status: false,
//         msg: "Error Occured",
//         err: err,
//       });
//     } else {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: newRewardpoint,
//       });
//     }
//   });
// };
