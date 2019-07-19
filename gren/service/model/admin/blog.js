const db = require('../../mongoose');

const blogSchema = db.Schema({
    title:{
        type:String,
        trim:true
    },
    athor:{
        type:String,
        trim:true
    },
    content:{
        type:String
    },
    catogeries:{
        type: Number
    },
    _del:{
        type: Number,
        default: 0
    },
    createTime:{
        type:Date,
        default:Date.now,
    },
    description:{
        type:String,
    }
})

const Blog = db.model('Blog',blogSchema,'blogs');

module.exports = Blog;