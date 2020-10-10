const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const PromoSchema = new Schema({
 
    name:{
        type: String,
        required: true,
        unique: true
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:Currency,
        min:0,
        required:true
        
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        Type:Boolean,
        default:false
    }
},

{
    timestamps:true
});

const Promotions = mongoose.model('Promotion', PromoSchema);

module.exports=Promotions;

