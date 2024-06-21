import { Tweet } from "../Models/tweetSchema.js";
import { User } from "../Models/userSchema.js";

export const createTweet = async (req, res) => {
    try {
        const { discription, id } = req.body;
        if (!discription || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            discription,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:"Tweet created successfully.",
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteTweet = async (req,res)=>{
    try{
        const {id}=req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(201).json({
            message:"Tweet delete successfully.",
            success:true,
        })

    }catch(error){
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};