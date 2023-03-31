const express=require("express")
const {connection}=require("./db")
require("dotenv").config()
const{userRouter}=require("./routes/user.router")
const {auth}=require("./middleware/auth.middleware")



const app=express()

app.use(express.json())

app.use("/user",userRouter)

app.use(auth)


app.listen(process.env.port,async(req,res)=>{

    try{
        await connection
        console.log("Connected to Db");
    }catch(err){
        console.log(err);
    }
    console.log("server is running")
})