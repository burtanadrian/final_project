//importam modulul userschema din userschem.js 
let user = require('./userschema');
//importam modulul 'jsonwebtoken' care este utilizat pt generarea si verificarea tokenurilor jwt
let jwt=require('jsonwebtoken');
//definirea unei chei secrete pt semnarea si si verificarea tokenurilor jwt(cripteaza si decripteaza informatii din tokenuri)
let secretKey='dasfsagshasasjasdha';
//create user
exports.CreateUser=async function(req,res){
    try{
        let newUser=await user.create(req.body);
        newUser.created=Date.now();
        newUser.updated=Date.now();
        await newUser.save();
        res.status(201).json({status:"Success",data:newUser});
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:'failed',message:err});
    }
}
//aceasta functie genereaza un jwt  folosind Id-ul utilizatorului furnizat si il semneaza folosind o cheie secreta 
let SignToken=id=>{return jwt.sign({id:id},secretKey,{expiresIn:'1h'})};
// all users
exports.allUsers=async function(req,res){
    try{
        let AllUsers = await user.find({});
        res.status(200).json({status:"Success",count : AllUsers.length,data:AllUsers})
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:'failed',message:err});
    }
}
//functia de Get users
exports.getUser=async function(req,res){
    try{
        let id =req.params.id;
        let userFound = await user.findById(id).populate({path:"comments",select:"description"});
       // res.status(200).json({status:"succes",data:userInfo})
        if(!userFound){
            return res.status(400).json({status:"Failed",message:"User not found"})
        }
        res.status(201).json({status:"Success!!",data:userFound});
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:'failed',message:err});
    }
}
//Functia de delete User
exports.DeleteUser= async function(req,res){
    try{
    let id =req.params.id;
   let result= await user.deleteOne({_id:id});
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
   // functia de Update User
 exports.UpdateUser=async function(req,res){
        try{
            let id=req.params.id;
            let UserFounded = await user.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});           
            
            if(!UserFounded){
            return res.status(400).json ({status:"Failed!!",message:"User not found!!!"});
               }
            UserFounded.updated=Date.now();
            await UserFounded.save();
             return res.status(201).json({status:"Success!!!",data:UserFounded})
        }
        catch(err){
             console.log(err);
             res.status(400).json({status:'failed',message:err});
         }
        }
///functia de login
exports.loginUser = async function(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("Email or password missing!!!");
        return;
    }
    user.findOne({ email: email }).then(data => {
        if (!data) {
            res.status(400).send("User not found!!!");
            return;
        } else {
            if (!data || !data.compPassw(password,data.password)) {
                res.status(400).send("Wrong Password!!!");
                return;
            } else {
                let token = SignToken(data._id);
                if (token) {
                    res.status(200).json({ status: 'Success!!', token: "Bearer " + token });
                }
            }
        }
    });
}
///verificam daca utilizatorul este logat
exports.ProtectUser =async function(req,res,next){
    try{
        let valueToken=req.headers.authorization;
        let token;
        if(valueToken&&valueToken.startsWith("Bearer")){
            token=valueToken.split(" ")[1];
        }
        if(!token){
            return res.status(401).json ({status:'Failed',message:"User is not logged!!"})
        }
        let verifyToken=await jwt.verify(token,secretKey);
        let currentUser= await user.findById(verifyToken.id);

        if(!currentUser){
            res.status(401).json({status:'Failed',message:"User not found!!"})
        }
        req.presentUser=currentUser;
        next();
    } catch(err){
        console.log(err);
        res.status(400).json({status:"Error!",message:JSON.stringify(err)})

    }
}

                               
///verificam daca userul este admin
exports.IsAdmin =async function(req,res,next){
            try{
                console.log(req.presentUser);
                if(req.presentUser && req.presentUser.permission && req.presentUser.permission=="admin") {
                    next();
                }else{
                    return res.status(403).json({status:'failed',message:"You don't have permision "})
                }
    
            }
            catch(err){
                console.log(err);
                res.status(400).json({status:'failed',message:err});
            }
           
    
         }
