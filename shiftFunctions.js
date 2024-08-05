const shiftSchema = require('./shiftSchema');
var shift=require('./shiftSchema');
//create shift
exports.addShift=async function(req,res){
    try{
        let newShift=await shift.create(req.body);
        newShift.userId=req.presentUser._id;
        await newShift.save();
        res.status(201).json({status:"Success",data:newShift});
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failed",message:err});
    }
}
//all shifts
exports.getAllShifts=async function (req,res){
    try{
        let allShifts =await shift.find();
        res.status(201).json({status:"Success",count:allShifts.length,data:allShifts})
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failed",message:err});
    }
}
//update shift
exports.updateShiftById = async function (req,res){
    try{
        let id=req.params.id;
        let shiftFound =await shift.findByIdAndUpdate(id,req.body,{
            new:true,runValidators:true
        })
        if(!shiftFound){
            return res.status (400).json({status:"Failed",message:"Shift not found"});
        }
        shiftFound.updated=Date.now();
        await shiftFound.save();
        res.status(201).json({status:"Success",data:shiftFound});
 }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failed",message:err});
    }
}
//delete shift
exports.deleteShift= async function(req,res){
    try{
    let id =req.params.id; //declaram variabila id
   let result= await shift.deleteOne({_id:id});
   if(result.deletedCount==0)
   {
    res.status(200).json({status:" No record to delete"});
    return;
   }
   else if(result.deletedCount>0)
   {
    res.status(200).json({status:"Delete with success"});

   }
    }
    catch(err)
    {
     res.status(400).json({status:"Error while deleting",data:err});

    }
}
//find shift by Id
exports.getShiftById=async function(req,res){
    try{
        let id =req.params.id;
        shiftFound=await shift.findById(id);
        if(!shiftFound){
            return res.status(400).json({status:"Failed",message:"Shift not found!!!"})
        }
        res.status(201).json({status:"Success",data:shiftFound});
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failed",message:err});
    }
}
