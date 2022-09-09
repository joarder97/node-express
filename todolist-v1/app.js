const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

var newItems = ["Breakfast", "Exercise"];
var workItems = [];

app.get("/", (req, res) => {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        listTitle: day,
        newListItem: newItems
    });
});

app.post("/", (req,res)=>{
    var newItem = req.body.newItem;
    console.log(req.body.button);
    
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
