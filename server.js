var express = require('express')

var app = express()

var path = require('path')
var fs = require('fs')
var queryAllCar = require('./util')

app.set('views' , path.resolve(__dirname ,'views'))
app.set('view engine' , 'ejs')
app.get('/' ,async (req, res)=>{
    var data = await queryAllCar()
    var resData = await JSON.parse(data)
    await console.log(data)
    await console.log(resData)
    res.render('index' , {data:resData})
})


app.listen(8000 , ()=>{
    console.log("Server is Starting at http://localhost:8080")
})