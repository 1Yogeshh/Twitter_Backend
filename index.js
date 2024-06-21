import express from "express";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoute.js"
import dotenv from "dotenv"
import tweetRoute from "./Routes/tweetRoute.js"

const PORT=5000
dotenv.config({
    path:".env"
})
databaseConnection();
const app = express();

//middleware
app.use(express.urlencoded({
    extended:true
}));


//
app.use(express.json())
app.use(cookieParser())


//routes
app.use("/api",userRoute);
app.use("/tweet",tweetRoute)

app.listen(PORT, ()=>{
    console.log(`server is listen at port ${PORT}`);
})