const User = require('../models/user')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const validatePassword = (password, dbpassword) => {
    bcrypt.compareSync(password, dbpassword)
    return true
}

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800h' });
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

exports.adduser = async (req, res) => {
    const { userID, username, password,pincode,phone_no,mobile_no,email, sortorder, status,website,date_of_birth,marriage_anniversary, gstin_no, udhyog_adhar_no,licence_no,technician_assot_no,gov_licence_no,aadhar_no,pancard_no,bank_name,bank_user_name,bank_account_no,ifsc_code,role,userImage,} = req.body

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(password, salt);

    const token = generateAccessToken({ username: username })

    const newUser = new User({
        userID: userID,
        username: username,
        password: hashpassword,
        pincode: pincode,
        phone_no: phone_no,
        mobile_no: mobile_no,
        email: email,
        website: website,
        date_of_birth: date_of_birth,
        marriage_anniversary: marriage_anniversary,
        gstin_no: gstin_no,
        udhyog_adhar_no: udhyog_adhar_no,
        licence_no: licence_no,
        technician_assot_no: technician_assot_no,
        gov_licence_no: gov_licence_no,
        aadhar_no: aadhar_no,
        pancard_no: pancard_no,
        bank_name: bank_name,
        bank_user_name: bank_user_name,
        bank_account_no: bank_account_no,
        ifsc_code: ifsc_code,
        role: role,
        userImage: userImage,
        sortorder: sortorder,
        status: status
    });

    const findexist = await User.findOne({ userID: userID })
    if (findexist) {
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data: {}
        })
    } else {
        newUser.save()
            .then(
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: newUser
                })
            )
            .catch(error => {
                res.status(400).json({
                    status: false,
                    msg: "error",
                    error: error
                })
            })
    }
}


exports.login = async (req, res) => {
    const { userID, password } = req.body

    // Find user with requested email 
    User.findOne({ userID: userID }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            if (validatePassword(password, user.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '365d' })

                return res.status(201).send({
                    message: "User Logged In",
                    token: token,
                    user: user
                })
            }
            else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
}


exports.edituser = async (req, res) => {
    const findandUpdateEntry = await User.findOneAndUpdate({
        _id: req.params.id
    }, { $set: req.body }, { new: true })
    if (findandUpdateEntry) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findandUpdateEntry
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}


exports.viewoneuser = async (req, res) => {
    const findone = await User.findOne({ _id: req.params.id })
    if (findone) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findone
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}

exports.alluser = async (req, res) => {
    const findall = await User.find().sort({ sortorder: 1 })
    if (findall) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}

exports.deleteuser = async (req, res) => {
    try {
        const deleteentry = await User.deleteOne({ _id: req.params.id })
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteentry
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error
        })
    }
}
