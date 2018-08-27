"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var hbs = require('hbs');
var fs = __importStar(require("fs"));
//either get port from heroku or use local instead
var port = process.env.PORT || 3000;
var app = express();
//registering partials for handlebars
hbs.registerPartials(__dirname + '/../views/partials');
//register global helpers
hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});
//setting the view engine
app.set('view engine', 'hbs');
//add middleware
//middlewares are executed in order! 
app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = now + ": " + req.method + " | " + req.url;
    fs.appendFile('server.log', log + 'n', function (err) {
        if (err) {
            console.log("unable to append file");
        }
    });
    console.log(log);
    next();
});
/*
app.use((req:any,res:any,next:Function) =>{
    res.render('maintenance.hbs',{
        pageTitle:"Maintenance"
    })
})
*/
//__durnam stores the directory of your project
app.use(express.static(__dirname + '/../public'));
app.get('/', function (request, response) {
    // You can send HTML
    //response.send("<h1>Hello Darkness</h1>");
    // You can send an JSON
    // response.send({
    //     name:"Houmam",
    //     likes:["reading","drawing"],
    // })
    //You can render a view template
    response.render('home.hbs', {
        pageTitle: "About Page",
        welcomeMessage: "Hello Darkness",
    });
});
app.get('/about', function (request, response) {
    // response.send("About Page")
    response.render('about.hbs', {
        pageTitle: "About Page",
    });
});
app.get('/bad', function (request, response) {
    response.send({
        error: "something horrible happened"
    });
});
// localhost:3000
app.listen(port, function () {
    console.log("Server is up and running on port " + port);
});
