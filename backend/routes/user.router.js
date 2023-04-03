const express=require("express")
const {userModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{

    const {name,email,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=> {
            if(err){
                res.send({"msg":err.message})
            }
            else{
                const user=new userModel ({name,email,password:hash})
                await user.save()
                res.send("Registration Successful")

            }
           
            
        });
        
    }catch(err){
        console.log(err)

    }
   
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{

        const user=await userModel.find({email})
        // console.log(user);
        if(user){
            bcrypt.compare(password,user[0].password,(err, result)=>{
                // result == true
                if(result){
                    let token=jwt.sign({course:"backend"},"masai")
                    res.status(200).send({"msg":"Login succesfull","token":token})

                }else{
                    res.status(400).send({"msg":"Something wnt wrong"})

                }
            });
        }
        
        
   
    }catch(err){
        res.status(400).send({"msg":err.message})

    }
   
})


module.exports={userRouter}