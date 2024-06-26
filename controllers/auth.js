import { User } from "../Models/userSchema.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register=async(req,res)=>{
    try{
        const{name,username,email,password}=req.body;

        //basic validation
        if(!name || !username || !email || !password){

            return res.status(403).json({
                message:"all field are required",
                success:false
            })
            
        }

        //
        const user =await User.findOne({email});
        if(user){
            return res.status(402).json({
                message:"User already exits",
                success:false
            })
        }

        //
        const hashedPassword=await bcryptjs.hash(password,16);

        //
        await User.create({
            name,
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            message:"Account Created",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

export const Login = async(req,res)=>{
    try{
        const {email, password}=req.body;

        if(!email || !password){

            return res.status(401).json({
                message:"all are field required",
                success:false
            })
            
        }

        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"user dont not exist",
                success:false
            })
        }

        const isMatch= await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect email or password",
                success:false
            });
        }

        const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "1d"
        });

        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
}catch(error){
        console.log(error);

    }
}


export const Logout= (req, res)=>{
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        message:"user log out succesfully",
        success:true
    })
}

export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error);
    }
};



export const getOtherUsers = async (req,res) =>{ 
    try {
         const {id} = req.params;
         const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
         if(!otherUsers){
            return res.status(401).json({
                message:"Currently do not have any users."
            })
         };
         return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
    }
}



export const follow = async (req, res)=>{
    try{

        const loggedInUserId =req.body.id;
        const userId= req.params.id;
        const loggedInUser= await User.findById(loggedInUserId);
        const user= await User.findById(userId);
        if(!user.followers.includes(loggedInUserId)){
            await user.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userId}});
        }else{
            return res.status(400).json({
                message:'User Already followed'
            })
        }
        return res.status(200).json({
            message:`${loggedInUser.name} just follow to ${user.name} `,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}



export const unfollow = async (req, res)=>{
    try{

        const loggedInUserId =req.body.id;
        const userId= req.params.id;
        const loggedInUser= await User.findById(loggedInUserId);
        const user= await User.findById(userId);
        if(loggedInUser.following.includes(userId)){
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userId}});
        }else{
            return res.status(400).json({
                message:'user has not follow yet'
            })
        }
        return res.status(200).json({
            message:`${loggedInUser.name} just unfollow to ${user.name} `,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
