var express = require('express')


var router = express.Router()

var path = require('path')
var fs = require('fs')
var blockQuery = require('../util')

router.get('/' , async (req, res)=>{
    var data = await blockQuery.queryAllCar()
    var resData = await JSON.parse(data)
    // await console.log(data)
    await console.log(resData[0].Key)
    res.render('index' , {data:resData})
})

router.get('/data',async (req, res)=>{
    var data = await blockQuery.queryAllCar()
    var resData = await JSON.parse(data)
    // await console.log(data)
    await console.log(resData[0].Key)
    res.send(resData)
})

module.exports =router;