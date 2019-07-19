const BlogModel = require('../../model/admin/blog')

async function listArticle(ctx,next){
    
    let {cur_page,pagesize,searchCondition} = ctx.request.body;
    console.log(ctx.header,"header")
    try{
        if(searchCondition.length<1 || Object.values(searchCondition[0])[0] === ''){
            let ret = await BlogModel.find({"_del":0});
            let res = await BlogModel.find({"_del":0}).sort({createTime: 'descending'})
                        .limit(pagesize)
                        .skip((cur_page-1)*pagesize);
            returnBody(ctx,{
                code:200,
                msg:'success',
                data:res,
                count:ret.length
            })
        }
        else{
            let res = await BlogModel.find({$and:[{"_del":0},{$or : searchCondition}]})
            .limit(pagesize)
            .skip((cur_page-1)*pagesize);
            if(res.length > 0){
                returnBody(ctx,{
                    code:200,
                    msg:'success',
                    data:res
                })
            }
            else{
                returnBody(ctx,{
                    code:406,
                    msg:'success',
                    data:'未查询到数据'
                })
            }
        }
       
    }
    catch(err){
        throw err
    }
}
async function addArticle(ctx,next){
    let {title,author,content,categories} = ctx.request.body;
    try{
        let res = await BlogModel.find({$and:[{"_del":0},{title:title}]});
        if(res.length>0){
            returnBody(ctx,{
                code:405,
                msg:'该文章已存在！'
            })
        }
        else{
            let newBlog = await new BlogModel(ctx.request.body);
            
            let ret = await newBlog.save((err,res) => {
                if(err) throw err
            })
            returnBody(ctx,{
                code:200,
                msg:'success'
            })
            
        }
    }
    catch(err){
        throw err
    }
}


async function updateArticle(ctx,next){
    let {title,author,content} = ctx.request.body;
    try{
        let res = await BlogModel.find({title:title});
        if(res.length<0){
            returnBody(ctx,{
                code:406,
                msg:'文章名错误！'
            })
        }
        else{
            let res = await BlogModel.update({title:title},{$set:{content:content,createTime:new Date()}});
            returnBody(ctx,{
                code:200,
                msg:'success'
            })
        }
    }
    catch(err){
        throw err
    }
}
async function deleteArticle(ctx,next){
    let {title} = ctx.request.body;
    try{
        let res = await BlogModel.find({title:title});
        if(res.length<0){
            returnBody(ctx,{
                code:406,
                msg:'文章名错误！'
            })
        }
        else{
            let res = await BlogModel.update({title:title},{$set:{_del:1,createTime:new Date()}});
            returnBody(ctx,{
                code:200,
                msg:'success'
            })
        }
    }
    catch(err){
        throw err
    }
}



function returnBody(ctx,obj){
    return ctx.body = obj
}

module.exports = {
    listArticle,
    addArticle,
    updateArticle,
    deleteArticle
}