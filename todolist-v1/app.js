const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const newItems = ["Breakfast", "Exercise"];
const workItems = [];

app.get("/", (req, res) => {
    const day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItem: newItems
    });
});

app.post("/", (req,res)=>{
    const newItem = req.body.newItem;
    // console.log(req.body.button);
    
    if(req.body.button === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        newItems.push(newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res)=>{
    res.render("list", {
        listTitle: "Work List",
        newListItem: workItems
    });
});

app.post("/work", (req,res)=>{
    res.redirect("/");
});

app.get("/about", (req,res)=>{
    res.render("about");
});

app.listen(3000, () => {
    console.log('Server is up and running on port number 3000');
});
