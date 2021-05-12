require('dotenv').config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users"); 

const fs = require("fs");

const nav = fs.readFileSync(__dirname + "/public/navbar/navbar.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const frontPage = fs.readFileSync(__dirname + "/public/frontpage.html", "utf-8"); 

app.get("/", (req, res) => {
    res.send(nav + frontPage + footer);
});






const PORT = process.env.PORT || 8080

app.listen(PORT, err => {
    err? console.log(err) : console.log('App runs on port: ', Number(PORT))
});

