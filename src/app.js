require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const userRoutes = require("./routes/userRoutes");
const articlesRoutes = require('./routes/articlesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const authroute = require('./routes/authroute');

const app = express();
const PORT = 7777;

app.use(cors({
    origin:[
        'http://localhost:4200'
    ],
    credentials:true
}))


// Middleware
app.use(express.json());



// Routes
app.use("/api/users", userRoutes); // abondand
app.use("/api/articles", articlesRoutes);
app.use("/api/categories",categoriesRoutes);
app.use("/admin",authroute)


async function startServer (){
    try {
        await pool.query('SELECT 1');
        console.log("data base connection successfull !");
        app.listen(PORT, ()=> {
            console.log("successfull listing to : ",PORT);
        });
    } catch (err) {
        console.log("database connection failure : ",err)
    }
}

startServer();
