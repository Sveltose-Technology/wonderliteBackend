const Staff = require("../models/staff");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
}

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.TOKEN_SECRET, (err:, user: ) => {
//       console.log(err)

//       if (err) return res.sendStatus(403)

//       req.user = user

//       next()
//     })
//   }

exports.addstaff = async (req, res) => {
  const {
    first_name,
    last_name,
    staff_email,
    password,
    mobile_no,
    role,
    sortorder,
    status,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  const token = generateAccessToken({ mobile_no: mobile_no });

  const newStaff = new Staff({
    first_name: first_name,
    last_name: last_name,
    staff_email: staff_email,
    password: hashpassword,
    mobile_no: mobile_no,
    role: role,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Staff.findOne({
    $or: [{ staff_email: staff_email }, { mobile_no: mobile_no }],
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newStaff
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.login = async (req, res) => {
  const { mobile_no, staff_email, password } = req.body;

  // Find user with requested email
  Staff.findOne(
    {
      $or: [
        { mobile_no: mobile_no },
        { staff_email: staff_email },
        { password: password },
      ],
    },
    function (err, user) {
      if (user === null) {
        return res.status(400).send({
          message: "User not found.",
        });
      } else {
        if (validatePassword(password, user.password)) {
          const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "365d",
          });

          return res.status(201).send({
            message: "User Logged In",
            token: token,
            user: user,
          });
        } else {
          return res.status(400).send({
            message: "Wrong Password",
          });
        }
      }
    }
  );
};

exports.editstaff = async (req, res) => {
  const findandUpdateEntry = await Staff.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );
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

exports.viewonestaff = async (req, res) => {
  const findone = await Staff.findOne({ _id: req.params.id }).populate("role");
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

exports.allstaff = async (req, res) => {
  const findall = await Staff.find().sort({ sortorder: 1 }).populate("role");
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

exports.deletestaff = async (req, res) => {
  try {
    const deleteentry = await Staff.deleteOne({ _id: req.params.id });
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
