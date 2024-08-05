const { MongoTailableCursorError } = require('mongodb');
let mongoose = require('mongoose');
let schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


let userSchema = new schema ({
    //validatori pt user
    
    email : {type:String,required:[true,"Email is invalid"],unique:true,lowerCase :true},
    password : {type:String,required:[true,"Password is required!!"],minLength:[8,"Min 8 characters!!!"],trim:true},
    ///unique este pt email unic si lowercase este pt convertirea tuturor literelor in litere mici
    firstName : {type:String,required:[true,"First name is required"],minLength :[2,"Minimum 2 characters is needed"],trim:true},
    //trim este pt stergerea spatiilor din fata first namelui
    lastName : {type:String,required:[true,"Last name is required"],minLength :[2,"Minimum 2 characters is needed"],trim:true},
    permission :{type:String,enum:['regularUser','admin'],default:'regularUser'},
    comments:[{type:mongoose.Schema.ObjectId,ref:"comments"}],
    created:{type:Date,default:()=>
    Date.now()},
    updated:Date,
    token:String

});
//definim middleware-ul care ruleaza inainte de "save",primeste o functie de tip next care este apelata pt a putea continua executia urm functii
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }else{
     var salt = 9;//salt = runde de criptare =9
       this.password=await bcrypt.hash(this.password,salt);//folosim bcrypt sa hasuiasca parola
       next();
    }
});
//middleware pt popularea ref din alta colectie(comments)
userSchema.pre(/^find/,function (next){
    this.populate({
        path:"comments",
        select:"description :_id created"
    })
    next();
})

userSchema.methods.compPassw=async function(plaintxtpassword,dbpassword){
    return await bcrypt.compare(plaintxtpassword,dbpassword);
};
userSchema.methods.generateToken=async function(){
    
    this.token=crypto.randomBytes(20).toString('hex');
    this.expiryTime=Date.now()+30*60*1000;
    return this.token;

}
module.exports =mongoose.model("users",userSchema);