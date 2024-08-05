var mongoose =require("mongoose");
var Schema = mongoose.Schema;
var shiftSchema= new Schema ({
    userId:{type:String,trim:true,lowercase:true},
    start:{type:Number},
    end:{type:Number},
    perHour: { 
        type: Number, 
        required: [true, "perHour required"],
        validate: {
            validator: function(value) {
                return value >= 0; 
            },
            message: 'perHour trebuie să fie un număr pozitiv sau zero'
        }
    },
    place:{type:String,enum:{values:["Brasov","Bucuresti","Cluj"],default:"Brasov",message:"Please choose one of the City"},required:[true,"place required"]},
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }

})
module.exports= mongoose.model("shifts",shiftSchema);