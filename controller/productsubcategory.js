const Productsubcategory = require('../models/productsubcategory')


exports.addproductsubcategory = async (req, res) => {
    const { name, productcategory, desc, sortorder, status } = req.body

    const newProductsubcategory = new Productsubcategory({
        name: name,
        desc: desc,
        productcategory: productcategory,
        sortorder: sortorder,
        status: status
    });

    const findexist = await Productsubcategory.findOne({ name: name })
    if (findexist) {
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data: {}
        })
    } else {
        newProductsubcategory.save()
            .then(
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: newProductsubcategory
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


exports.editproductsubcategory = async (req, res) => {
    const findandUpdateEntry = await Productsubcategory.findOneAndUpdate({
        _id: req.params.id
    }, { $set: req.body }, { new: true }).populate("productcategory")
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


exports.viewoneproductsubcategory = async (req, res) => {
    const findone = await Productsubcategory.findOne({ _id: req.params.id }).populate("productcategory")
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

exports.allproductsubcategory = async (req, res) => {
    const findall = await Productsubcategory.find().sort({ sortorder: 1 }).populate("productcategory")
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

exports.deleteproductsubcategory = async (req, res) => {
    try {
        const deleteentry = await Productsubcategory.deleteOne({ _id: req.params.id })
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

exports.getsubcategory = async (req, res) => {
    const findall = await Productsubcategory.find({ productcategory: req.params.id }).sort({ sortorder: 1 })
    if (findall.length !== 0) {
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
