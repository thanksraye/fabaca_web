var express = require('express')


var router = express.Router()

var path = require('path')
var fs = require('fs')
var blockQuery = require('../util')

router.get('/' , async (req, res)=>{
    var data = await blockQuery.queryAllData()
    var resData = await JSON.parse(data)
    // await console.log(data)
    await console.log(resData[0])
    res.render('index' , {data:resData})
})

router.get('/data',async (req, res)=>{
    var data = await blockQuery.queryAllData()
    var resData = await JSON.parse(data)
    // await console.log(data)
    await console.log(resData[0].Key)
    res.send(resData)
})


router.post('/createcar', async (req, res)=>{
    
    var key = req.body.key;
    var maker = req.body.maker
    var model = req.body.model 
    var color = req.body.color
    var owner = req.body.owner

    await blockQuery.createCars(key , maker, model, color , owner)
    await console.log("Success")
    await res.send("Sucess input data in BlockCh")

})

router.post('/changeowner', async (req, res)=>{
    var key = req.body.key;
    var buyer = req.body.buyer
    var result = await blockQuery.query_all_car();
    console.log(result)
    if (result == "No Data") {
        res.send("No Data Key")
    } else {
        
        await blockQuery.changeCars(key , buyer)
        await console.log("Success")
        await res.render("Sucess input data in BlockCh")
    }

    

})

module.exports =router;