const express = require("express")
const path = require("path")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const fs = require("fs")

let app = express()

let option = {
    defaultLayout: "main"
}

app.use(bodyParser.urlencoded({extended:false}))
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine","handlebars")

app.get("/",(req,res)=>{
    res.render("mainpage")
})

app.post("/Login",(req,res)=>{
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){console.log(err)}else{
            let UserID = req.body.ID
            let pass = req.body.Password        
            let objdata = JSON.parse(data)
            if (objdata.password == pass && objdata.userName == UserID) {
                res.send("Login Completed")
                // app.get("/Login",(req,res)=>{
                //     res.render("loginCompt")
                // })
            }
            else{
                // res.send("Please check your ID again")
                res.redirect("/OC")
                
                // app.get("/Login",(req,res)=>{
                //     res.render("loginPage")
                // })
            }
            
            console.log(objdata)
            console.log(UserID)
            console.log(pass)
            
        }
    })
    
    // res.send("Login Completed")
    // console.log("Please check your ID again")


})
 
app.get("/Login",(req,res)=>{
    res.render("loginPage")
})

app.get("/OC",(req,res)=>{
    res.render("loginFailed")
})

app.listen(701,(err)=>{
    if(err){console.log(err)}else{
        console.log("App listen at 701")
    }
})

app.use(express.static("public"))


