const express = require('express');
const hbs = require('hbs');
import * as fs from 'fs';
//either get port from heroku or use local instead
const port = process.env.PORT || 3000;

let app = express();

//registering partials for handlebars
hbs.registerPartials(__dirname+'/../views/partials');

//register global helpers
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text:string)=>{
    return text.toUpperCase();
})

//setting the view engine
app.set('view engine', 'hbs')

//add middleware
//middlewares are executed in order! 

app.use((req:any,res:any,next:Function)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} | ${req.url}`;
    fs.appendFile('server.log',log+'n',(err)=>{
        if(err){
            console.log("unable to append file");
        }
    });
    console.log(log);
    next();
})

/*
app.use((req:any,res:any,next:Function) =>{
    res.render('maintenance.hbs',{
        pageTitle:"Maintenance"
    })
})
*/

//__durnam stores the directory of your project
app.use(express.static(__dirname+'/../public'))

app.get('/',(request : any , response : any)=>{
    // You can send HTML
    //response.send("<h1>Hello Darkness</h1>");

    // You can send an JSON
    // response.send({
    //     name:"Houmam",
    //     likes:["reading","drawing"],
    // })

    //You can render a view template
    response.render('home.hbs',{
        pageTitle:"About Page",
        welcomeMessage: "Hello Darkness",
    })
});

// To use custom status codes
// app.status(200).send("Hello World")

app.get('/about',(request : any , response : any)=>{
    // response.send("About Page")
    response.render('about.hbs',{
        pageTitle:"About Page",
    })
});

app.get('/bad',(request : any , response : any)=>{
    response.send({
        error:"something horrible happened"
    })
});

// localhost:3000
app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
});
