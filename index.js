const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("*"));

const connFactory = require("./connection/connFactory.js");

let params = {
    "username": "",
    "host": "",
    "dbname": "",
    "password": ""
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
