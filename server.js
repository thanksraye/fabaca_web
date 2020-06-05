var express = require('express')

var app = express()

var path = require('path')
var fs = require('fs')

app.set('views' , path.resolve(__dirname ,'views'))
app.set('view engine' , 'ejs')
app.get('/' , (req, res)=>{

    res.render('index')
})


app.listen(8080 , ()=>{
    console.log("Server is Starting at http://localhost:8080")
})