import express from "express"
import isAuthenticated from "../config/auth.js";
import { createTweet, deleteTweet, getFollowingTweets, getTweet, likeOrDislike, ownTweet } from "../controllers/tweetcontoller.js";

const router= express.Router();

router.route("/create").post(isAuthenticated,createTweet)
router.route("/delete/:id").delete(isAuthenticated, deleteTweet)
router.route("/like/:id").put(isAuthenticated,likeOrDislike)
router.route("/alltweet/:id").get(isAuthenticated,getTweet)
router.route("/followingtweet/:id").get(isAuthenticated,getFollowingTweets)
router.route("/alltweet/:id").get(isAuthenticated,ownTweet)


export default router;