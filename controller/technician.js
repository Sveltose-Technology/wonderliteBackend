const Technician = require('../models/technician')


exports.addtechnician = async (req, res) => {
    const { technicianID,technicianname,password,desc,Image, sortorder, status } = req.body

    const newTechnician = new Technician({
        technicianID: technicianID,
        technicianname: technicianname,
        password:password,
        desc: desc,
        Image: Image,
        sortorder: sortorder,
        status: status
    });

    const findexist = await Technician.findOne({ technicianID: technicianID})
    if(findexist){
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data: {}
        })
    } else{
        newTechnician.save()
        .then(
            res.status(200).json({
                status: true,
                msg: "success",
                data: newTechnician
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


exports.edittechnician = async (req, res) => {
    const findandUpdateEntry = await Technician.findOneAndUpdate({
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


exports.viewonetechnician = async (req,res)=>{
    const findone = await Technician.findOne({ _id: req.params.id})
    if(findone){
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

exports.alltechnician = async (req, res) => {
    const findall = await Technician.find().sort({sortorder:1})
    if(findall){
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

exports.deletetechnician = async (req, res) => {
    try {
        const deleteentry = await Technician.deleteOne({ _id: req.params.id })
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
