const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorHandler = require("./middleWare/errorMiddleware")
var cookieParser = require('cookie-parser')

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const clientRoute = require("./routes/clientRoute");


const path = require("path");



const app = express()
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    // origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    credentials: true,
  }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes Middleware
app.use("/api/user", userRoute);
// app.use("/api/clients", productRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/clients", clientRoute);

//Routes

app.get('/', (req,res) => {
    res.send('Home');
})


const PORT = process.env.PORT|| 5000;

// Error middleware
app.use(errorHandler);

// conect to DB and Sgart server
mongoose
    .connect(process.env.MONGO_URI)
     .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
     })
     .catch((err)=>console.error(err))


