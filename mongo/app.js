//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/peopleDB", { useNewUrlParser: true});

const peopleSchema = new mongoose.Schema ({
    name: String,
    age : Number
});

const People = mongoose.model("people", peopleSchema);

const masud = new People ({
    name: "Masudul",
    age: 25
});

const shuvam = new People ({
    name: "Shuvam",
    age: 29
});

// People.insertMany([masud, shuvam], function (err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Success");
//     }
// });

// People.find( {name: 'Masudul'}, function(err, peoples) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(peoples);
//     }
// });

People.find(function(err, peoples) {
    if(err) {
        console.log(err);
    } else {
        mongoose.connection.close();

        peoples.forEach( function(people) {
            console.log(people.name);
        });
    }
});


