const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
                if(decoded){
            next()
            }else{
            res.status(400).send({"msg":"Login first"})
            }
        })
        

        
    }else{
        res.status(400).send({"msg":"Login first"})
    }

}



module.exports={auth}