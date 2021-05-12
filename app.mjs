import {} from "dotenv/config";
import { dirname } from "path"
import { fileURLToPath } from "url";
import express from "express"
import fs from "fs"
import routerPosts from "./routes/posts.mjs";
import routerUser from "./routes/users.mjs";
import passwordToHash from "./passwordManagment.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

