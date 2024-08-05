//Se importă modulul mongoose, care este necesar pentru a interacționa cu baza de date MongoDB.
let mongoose =require("mongoose");
//Se definește schema pentru modelul de comentariu folosind clasa Schema
let Schema = mongoose.Schema;

let commentSchema=new Schema({
    userId:{type:String,trim:true,lowercase:true},
    description:{type:String,required:[true,"Description required!!"],trim:true,lowercase:true,min:[5,"Too short Comments!!!"]},
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
})
module.exports=mongoose.model("comments",commentSchema);
