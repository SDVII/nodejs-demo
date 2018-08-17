"use strict";
var express = require('express');
var app = express();
//middleware
//__durnam stores the directory of your project
app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
    //response.send("<h1>Hello Darkness</h1>");
    response.send({
        name: "Houmam",
        likes: ["reading", "drawing"]
    });
});
app.get('/about', function (request, response) {
    response.send("About Page");
});
app.get('/bad', function (request, response) {
    response.send({
        error: "something horrible happened"
    });
});
app.listen(3000);
