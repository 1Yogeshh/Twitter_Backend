import express from "express"
import isAuthenticated from "../config/auth.js";
import multer from "multer";
import { createTweet, deleteTweet, getFollowingTweets, getTweet, likeOrDislike, ownTweet, ImageUpload } from "../controllers/tweetcontoller.js";

const router= express.Router();
const upload = multer({ dest: 'uploads/' });

router.route("/create").post(isAuthenticated,createTweet)
router.route("/delete/:id").delete(isAuthenticated, deleteTweet)
router.route("/like/:id").put(isAuthenticated,likeOrDislike)
router.route("/alltweet/:id").get(isAuthenticated,getTweet)
router.route("/followingtweet/:id").get(isAuthenticated,getFollowingTweets)
router.route("/owntweet/:id").get(isAuthenticated,ownTweet)


router.route("comment/:id").put(isAuthenticated)
router.route("uncomment/:id").put(isAuthenticated)

export default router;