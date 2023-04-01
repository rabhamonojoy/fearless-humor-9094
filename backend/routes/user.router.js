const express=require("express")
const {userModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{

    const {First_name,Last_name,email,password}=req.body
    try{
        bcrypt.hash(password,5,async (err, hash)=> {
            const user=new userModel({First_name,Last_name,email,password})
           await user.save()
            res.send()
            alert("Registration Successful")
        });
        
    }catch(err){
        console.log(err)

    }
   
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{

        const user=await userModel.find({email})
        console.log(user);
        if(user){
            bcrypt.compare(password,user[0].password,(err, result)=>{
                // result == true
                if(result){
                    res.status(200).send({"msg":"Login succesfull","token":jwt.sign({ "course":"Backend"},"masai")})

                }else{
                    res.status(400).send({"msg":"Wrong Credentials"})

                }
            });
        }
        
        
   
    }catch(err){
        res.status(400).send({"msg":err.message})

    }
   
})


module.exports={userRouter}