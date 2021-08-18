const careerform = require("../models/careerform");
const Carrerform = require("../models/careerform");

exports.addcareerform = async (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    phone_no,
    state,
    city,
    enterfield_choice,
    summary,
    career_img,
  } = req.body;

  const newCareerform = new Careerform({
    first_name: first_name,
    last_name: last_name,
    email_address: email_address,
    phone_no: phone_no,
    state: state,
    city: city,
    enterfield_choice: enterfield_choice,
    summary: summary,
    career_img: career_img,
  });

  if (req.file) {
    const findexist = await Careerform.findOne(
      { first_name: first_name },
      { last_name: last_name }
    );
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newCareerform._img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newCareerform.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newCareerform,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  } else {
    const findexist = await Careerform.findOne({ first_name: first_name });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newCareerform
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newCareerform,
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
  }
};
exports.allcareerform = async (req, res) => {
  const findall = await Careerform.find().sort({ sortorder: 1 });
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
