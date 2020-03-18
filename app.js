var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var shopListDB = require("./src/db/shopList");
// 跨域方法一：
// app.all("*",function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// })
app.post("/wpDate", function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    // console.log(req.body);
    var sp = new shopListDB({
        wpObject: req.body
    })
    sp.save(function (err, data) {
        if (err) {
            console.log(arguments);
            res.send("支付失败，出现错误（待开发）")
        } else {
            // console.log(arguments);
            res.send("支付成功（待开发）")
        }
    })
})
app.listen(3000, function () {
    console.log("Running....")
})