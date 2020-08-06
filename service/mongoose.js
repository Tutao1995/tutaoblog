const mongoose = require('mongoose');
const DB_URL = "mongodb://127.0.0.1:27017/loguser"

mongoose.connect(DB_URL,{useNewUrlParser:true},function(err){
    if(err) {
        console.log(err);
        return;
    }
    else{
        console.log('数据库连接成功！')
    } 
})

module.exports = mongoose;