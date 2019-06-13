const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("*"));

const connFactory = require("./connection/connFactory.js");

let params = {
    "username": "96ba32ad-e17d-494f-a93e-72240b1e0b16-bluemix",
    "host": "96ba32ad-e17d-494f-a93e-72240b1e0b16-bluemix.cloudant.com",
    "dbname": "talk-alphaville",
    "password": "e373c010bcb53c3ea89a59f7fa2642789e7bfe3128bab1c3e2762b713ab04641"
};

app.get('/api/test', function (req, res) {
    console.log("GET /api/test");
    
    
    min = Math.ceil(0);
    max = Math.floor(20);

    res.send({
        result: "MEETUP Inova!",
        random: Math.floor(Math.random() * (max - min + 1)) + min
    })
});

app.get('/api/user', function (req, res) {
    console.log("GET /api/user");
    let query = {
        selector: {
            type: "USER"
        }
    };

    let request = connFactory.getDocument(params, query)
    request.then(function (result) {
        res.send(result);
    })
});

var port = process.env.PORT || 3001
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
