const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (like images, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "tayyabyahya",
        content: "Hello! I want to do something for the love of tech :)",
        pic: '/images/tayyab.jpg'
    },
    {
        id: uuidv4(),
        username: "shradhakhapra",
        content: "Hello! I am the co-founder of apna-college.",
        pic: "https://tse1.mm.bing.net/th/id/OIP.nlrqX_nEgkgHG23T41Tw_AHaE8?pid=Api&P=0&h=220"
    },
    {
        id: uuidv4(),
        username: "nvidia",
        content: "Hardwork is important for success.",
        pic: "https://tse3.mm.bing.net/th/id/OIP.BNyRHgCLt03nJe_pyQZYgQHaEK?pid=Api&P=0&h=220"
    }
];

app.get("/home", (req, res) => {
    res.render('index.ejs', { posts });
})

app.get("/home/new", (req, res) => {
    res.render('new.ejs');
})

app.get('/home/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render('view.ejs', { post });
})

app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render('edit.ejs', { post });
})

app.patch("/home/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    let newPic = req.body.pic;
    post.content = newContent;
    post.pic = newPic;
    res.redirect("/home");
})

app.post("/home", (req, res) => {
    let id = uuidv4();
    let { username, content, pic } = req.body;
    posts.push({id, username, content, pic});
    res.redirect("/home");
})

app.delete("/home/:id", (req, res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id!==p.id);
    res.redirect("/home");
})

app.listen(port, ()=>{
    console.log("Listening on port 8080");
})