import passwordToHash from "./passwordManagment.mjs";
import express from "express"
import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url";
import routerPosts from "./routes/posts.mjs";
import routerUser from "./routes/users.mjs";


const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(routerUser)
app.use(routerPosts)

console.log(passwordToHash("hello"));


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

