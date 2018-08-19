var db = {};
const asyncRedis = require('async-redis')
const client = asyncRedis .createClient()
client.on("error", function (err) {
    console.log("Error :", err);
});

client.on('connect', function(){
    console.log('Redis连接成功.');
  })

  db.set= async (key ,val)=>{
     var result= await client.set(key, val);
     return result
  }
  db.get= async (key )=>{
    var result= await client.get(key);
    return result
 }
 db.add1= async (key )=>{
    var result= await client.get(key);
    var num =+result+1
    var result= await client.set(key,num);
    return result
 }

  module.exports = db;