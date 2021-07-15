const gst_rate = require('../models/gst_rate');


exports.addgst = async (req,res)=>{
const {gst_title,value,desc,shortorder,status} =req.body

const newGst_rate= new gst_rate({
    gst_title:gst_title,
    value:value,
    desc:desc,
    shortorder:shortorder,
    status:status
});

const findexist = await gst_rate.findOne({gst_title:gst_title})
if(findexist){
    res.status(400).json({
        status:false,
        msg:"Already Exist",
        data:{}
    })
}else{
    newGst_rate.save()
    .then(
        res.status(200).json({
            status:true,
            msg:"success",
            data:newGst_rate
        })
    )
    .catch(error=>{
        res.status(400).json({
            status:false,
            msg:"error",
            error:error
        })
    })
}

}


exports.viewone =async(req,res)=>{
    const findone=await gst_rate.findOne({_id:req.params.id})
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

exports.viewall =async(req,res)=>{
    const findall =await gst_rate.find().sort({sortorder:1})
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

exports.delgst =async(req,res)=>{
   try {
       const deleteentry=await gst_rate.deleteOne({_id:req.params.id})
       res.status(200).json({
           status:true,
           msg:"success",
           data:deleteentry
       })

   } catch(error){
       res.status(400).json({
           status:false,
           msg:"error",
           error:error
       })
   }

}

exports.editgst = async(req,res)=>{
    const findandUpdateEntry =await gst_rate.findOneAndUpdate({
        _id:req.params.id
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
