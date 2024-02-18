const express = require("express");
const mongoose = require("mongoose");
// const multer = require("multer");
const dotenv = require("dotenv");
const Book = require("./models/bookModels");
const booksRoute = require("./routes/booksRoute.js");

const app = express();

// server: initial greeting
console.log("\nServer initialization...\n");

mongoose.set("strictQuery", false);

// Check if it"s not on production then use dotenv
if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

//Middlewares
app.use(express.json()) // To handle json data
app.use("/books", booksRoute); // This will redirect to booksRoute routers

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to my books app");
})


//connection params
const CONNECTION_STRING= process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 5000;


// Initialize database connexion
const start = async() => {
    try {
        await mongoose.connect(CONNECTION_STRING);

        app.listen(PORT, () => {
            console.log("success connect...", PORT);
        })
    }catch(error) {
        console.log("Error ", error.message);
    }
    
}

start();