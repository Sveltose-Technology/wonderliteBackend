const Productcategory = require('../models/productcategory')


exports.addproductcategory = async (req, res) => {
    const { name, desc, sortorder, status } = req.body

    const newProductcategory = new Productcategory({
        name: name,
        desc: desc,
        sortorder: sortorder,
        status: status
    });

    const findexist = await Productcategory.findOne({ name: name })
    if (findexist) {
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data: {}
        })
    } else {
        newProductcategory.save()
            .then(
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: newProductcategory
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


exports.editproductcategory = async (req, res) => {
    const findandUpdateEntry = await Productcategory.findOneAndUpdate({
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


exports.viewoneproductcategory = async (req, res) => {
    const findone = await Productcategory.findOne({ _id: req.params.id })
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

exports.allproductcategory = async (req, res) => {
    const findall = await Productcategory.find().sort({ sortorder: 1 })
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

exports.deleteproductcategory = async (req, res) => {
    try {
        const deleteentry = await Productcategory.deleteOne({ _id: req.params.id })
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
