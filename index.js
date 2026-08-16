const express = require("express");
// const {users} = require("./data/users.json")
const dotenv = require("dotenv")


// import database connection file
const DbConnection = require('./databaseConnection')

// importing the routers
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");   

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res)=> {
    res.status(200).json({
        message: "Home Page :-)"
    })
})

app.use("/users", usersRouter);
app.use("/books", booksRouter);




// app.all('*',(req, res)=> {
//     res.status(500).json({
//         message: "Not Built Yet"
//     })
// })

app.listen(PORT, ()=>{
    console.log(`Server is up and rruning on http://localhost:${PORT}`)
})