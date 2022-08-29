const express=require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app=express();
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get("/", function(req, res){
	res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
	// console.log(req.body.cityName);
	const cityName = req.body.cityName;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=e89c4206ab29c631c8a2fbac2965deed&units=metric";

	https.get(url, function(response){
		response.on("data", function(data){
			try{
				const weatherData = JSON.parse(data);
				const description = weatherData.weather[0].description;
				const temp = weatherData.main.temp;
				const conditionCode = weatherData.weather[0].icon;
				// console.log(conditionCode);
				const icon = "http://openweathermap.org/img/wn/"+conditionCode+"@2x.png";
	
				res.write("<p>The temp is: " + temp + " degrees celcius</p>");
				res.write("<h2>The weather is currently " + description + "</h2>");
				res.write("<img src=" + icon + ">");

				res.write("<br><a href='/'>Back</a>");

				res.send();
			} catch(err){
				res.write("<h1>City not found</h1>");
				res.write("<br><a href='/'>Back</a>");
				res.send();
			}
		});
	});

});

app.listen(3000, ()=>{
	console.log("Server started at port 3000");
});