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
    var resDataUser = await JSON.parse(data[0])
    var resDataReport = await JSON.parse(data[1])
    // await console.log(data)
    await console.log(resDataUser[0].Key)
    res.send([resDataUser,resDataReport])
})


router.post('/createreport', async (req, res)=>{
    var key = req.body.key;
    var reportType = req.body.reportType;
    var user = req.body.user
    var barcode = req.body.barcode 
    var contexReport = req.body.contexReport
    var status = req.body.status

    await blockQuery.createReports(key,reportType, user, barcode,contexReport, status)
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