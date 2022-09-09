const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var newItems = ["Breakfast", "Exercise"];

app.get("/", (req, res) => {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newListItem: newItems
    });
});

app.post("/", (req,res)=>{
    var newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log('Server is up and running on port number 3000');
});
