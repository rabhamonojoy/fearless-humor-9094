const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    title:String,
    description:String,
    images:{
        type:Array,
        required:true
    }
},{
    versionKey:false
})
const productModel=mongoose.model("product",productSchema)
module.exports={productModel}