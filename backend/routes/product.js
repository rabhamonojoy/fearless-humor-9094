const express=require("express")
const multer=require("multer")
const productRoute=express.Router()

const path=require("path")
productRoute.use(express.static("public"));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/productImages'),function(err,success){
            if(err){
                throw err
            }
        })
    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name,function(err,success){
            if(err){
                throw err
            }
        })
    }
})
const upload=multer({storage:storage});

productRoute.post("/add",upload.array("image"))

module.exports={productRoute}
