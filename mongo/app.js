//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/peopleDB", { useNewUrlParser: true});


const fruitSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    review: {
        type: String
    }
});

const peopleSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 1,
        max: 130
    },
    hobby: {
        type: String
    },
    favouriteFruit: fruitSchema
});

const People = mongoose.model("people", peopleSchema);
const Fruit = mongoose.model("fruit", fruitSchema);

const kiwi = new Fruit ({
    name: "kiwi",
    review: "Name sounds good!"
});

// kiwi.save();

// const masud = new People ({
//     name: "Masudul1",
//     age: 25
// });

const shuvam = new People ({
    name: "Shuvam1",
    age: 29,
    favouriteFruit: kiwi
});

shuvam.save();


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

// People.find(function(err, peoples) {
//     if(err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close();
//         peoples.forEach( function(people) {
//         console.log(people.name);
//         });
//     }
// });

// update data
// People.updateOne({_id: "6316342f1a96e8d8731532c4"}, {hobby: "Music"}, (err)=>{
//     if(err) {
//         console.log("ERROR!!!!");
//         console.log(err);
//     } else {
//         console.log("Updated");
//     }
// });


//delete data

// People.deleteOne({_id: "6316342f1a96e8d8731532c3"}, (err)=>{
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("deleted");
//     }
// });

