import express from "express"
import isAuthenticated from "../config/auth.js";
import { createTweet, deleteTweet, likeOrDislike } from "../controllers/tweetcontoller.js";

const router= express.Router();

router.route("/create").post(isAuthenticated,createTweet)
router.route("/delete/:id").delete(isAuthenticated, deleteTweet)
router.route("/like/:id").put(isAuthenticated,likeOrDislike)


export default router;