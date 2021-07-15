const Enquiry = require('../models/enquiry')



exports.addenquiry = async(req,res)=>{
const {userId,product_name,product_model,qty,address,sortorder,status}=req.body

     const newEnquiry = new Enquiry({
         userId:userId,
         product_name:product_name,
         product_model:product_model,
         qty:qty,
         address:address,
         sortorder:sortorder,
         status:status
     });

     const findexist = await Enquiry.findOne({userId : userId})
     
         if(findexist){
             res.status(400).json({
                 status:false,
                 msg:"Already Exist",
                 data:{}
             })
         }else{
             newEnquiry.save()
             .then(
             res.status(200).json({
                 status:true,
                 msg:"sucess",
                 data:newEnquiry
               })
             ).catch(error =>{
                res.status(400).json({
                    status:false,
                    msg:"error",
                    error:error
                })
            })
     }


}

exports.editenquiry = async(req,res)=>{
    const findandUpdateEntry = await Enquiry.findOneAndUpdate({
        _id: req.params.id
    },{$set:req.body},{new:true})
    if(findandUpdateEntry){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findandUpdateEntry
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }
    
}

exports.viewoneenquiry = async(req,res)=>{
    const findone = await Enquiry.findOne({_id:req.params.id})
    if(findone){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findone
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }
    
}

exports.viewallenquiry = async(req,res)=>{
    const findall = await Enquiry.find().sort({sortorder:1})
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }

    
}

exports.delenquiry = async(req,res)=>{
    try {
        const deleteentry = await Enquiry.deleteOne({_id:req.params.id})
        res.status(200).json({
            status:true,
            msg:"success",
            data:deleteentry
        })
    } catch(error){
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }

}