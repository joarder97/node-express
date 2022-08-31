//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config({path:__dirname+'/.env'})

const app = express();
app.use(bodyParser.urlencoded({
        extended: true 
    }));

app.use(express.static("public")); 

mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER,
});


app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const run = async () => {
        console.log(process.env.USER_ID);
        const response = await mailchimp.lists.batchListMembers(process.env.USER_ID, jsonData);
        const error = JSON.stringify(response);
        var json = JSON.parse(error);
        if(json.error_count > 0){
            res.sendFile(__dirname + "/failure.html");
        } else{
            res.sendFile(__dirname + "/success.html");
        }

    };

    try{
        run();
    } catch(err){
        console.log(err);
    } 
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});




app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
} );