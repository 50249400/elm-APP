var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/elm");
var db = mongoose.connection;
db.on("open",function(){
    console.log("数据库连接成功");
})
db.on("error",function(){
    console.log("数据库连接失败");
    console.log(arguments);
})
var Schema = mongoose.Schema;
var shopListSchame = new Schema({
    wpObject: Object
})
var ShopList = mongoose.model("shopList",shopListSchame);
module.exports = ShopList;