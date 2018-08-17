const express = require('express');

let app = express();

//middleware
//__durnam stores the directory of your project
app.use(express.static(__dirname+'/public'))

app.get('/',(request : any , response : any)=>{
    //response.send("<h1>Hello Darkness</h1>");
    response.send({
        name:"Houmam",
        likes:["reading","drawing"]
    })
});

app.get('/about',(request : any , response : any)=>{
    response.send("About Page")
});

app.get('/bad',(request : any , response : any)=>{
    response.send({
        error:"something horrible happened"
    })
});

app.listen(3000);
