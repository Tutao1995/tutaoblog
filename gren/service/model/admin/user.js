const db = require('../../mongoose');

const userSchema = db.Schema({
    name:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    roles:{
        type: Array,
        default:[
            {
                title:'文章详情',
                icon:'el-icon-s-order',
                url:'articleDetail'
            }
        ]
    },
    creatTime:{
        type:Date,
        default:Date.now,
    }
})

const User = db.model('User',userSchema);

module.exports = User;