let comments=require("./commentSchema");
///crearea unui nou comentariu
exports.createComment=async function(req,res){
    try{
        let newComment=await comments.create(req.body);
        newComment.userId=req.presentUser._id;
        req.presentUser.comments.push(newComment);
        await newComment.save();
        await req.presentUser.save();
        res.status(201).json({status:"Success!!",data:newComment});

    }catch(err){
        console.log(err);
        res.status(400).json({status:"failed",message:err})

    }
}
///obținerea tuturor comentariilor din baza de date
exports.getAllComments=async function (req,res) {
    try{
        let getAllComments=await comments.find();
        res.status(201).json({status:"Success",count:getAllComments.length,data:getAllComments});

    }catch(err){
        console.log(err);
        res.status(400).json({status:"failed",message:err})

    }
}
//update comment byId
exports.updateCommentById = async function (req,res){
    try{
        let id=req.params.id;
        let commentFound =await comments.findByIdAndUpdate(id,req.body,{
            new:true,runValidators:true
        })
        if(!commentFound){
            return res.status (400).json({status:"Failed",message:"Comment not found"});
        }
        commentFound.updated=Date.now();
        await commentFound.save();
        res.status(201).json({status:"Success",data:commentFound});
 }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failed",message:err});
    }
}
//delete comment
exports.deleteComment= async function(req,res){
    try{
    let id =req.params.id; //declaram variabila id
   let result= await comments.deleteOne({_id:id});
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
//find comment by Id
exports.getCommentById=async function(req,res){
    try{
        let id =req.params.id;
        commentFound=await comments.findById(id);
        if(!commentFound){
            return res.status(400).json({status:"Failed",message:"Comment not found!!!"})
        }
        res.status(201).json({status:"Success",data:commentFound});
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failed",message:err});
    }
}
