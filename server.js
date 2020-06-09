var express = require('express')
var shell = require('shelljs')

var app = express()

var path = require('path')
var fs = require('fs')
var blockQuery = require('./util')
var blockRouter = require('./routes/blockRouter')
// var bodyParser = require('body-parser')

app.set('views' , path.resolve(__dirname ,'views'))
app.set('view engine' , 'ejs')

app.use(express.urlencoded({extended:true}))//for parsing application/x-www-form-urlenconded
app.use(express.json())//for parsing application/json


app.use('/', blockRouter )



// const networkRun = ()=>{
//     if(shell.exec('ls -la').code !== 0) {
//         shell.echo('Error: command failed')
//         shell.exit(1)
//       }
//     cmd = 'cd fabcar && ./startFabric.sh'
//     shell.exec(cmd, (err , stdout, stderr)=>{
//         if(err) {
//             console.log(err)
//         } else {
//             console.log(stdout)
//         }
//     })  
      
//     // shell.exit(1)
    
// }
// networkRun()

app.listen(8000 , async ()=>{
    await console.log("Server is Starting at http://localhost:8000")
})
