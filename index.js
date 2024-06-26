import express from "express";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoute.js"
import dotenv from "dotenv"
import tweetRoute from "./Routes/tweetRoute.js"
import cors from "cors";
import bodyParser from "body-parser";




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
app.use(express.json({
    extended:false
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));




//routes
app.use("/api",userRoute);
app.use("/tweet",tweetRoute)

app.listen(PORT, ()=>{
    console.log(`server is listen at port ${PORT}`);
})