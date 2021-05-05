const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users"); 

const fs = require("fs");

const test = fs.readFileSync(__dirname + "/public/test.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

app.get("/", (req, res) => {
    res.send(test + footer);
});






const PORT = process.env.PORT || 8080

app.listen(PORT, err => {
    err? console.log(err) : console.log('App runs on port: ', Number(PORT))
});

