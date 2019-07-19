const UserModel = require('../../model/admin/user')
const jwt = require('jsonwebtoken')
const admin_secret = require('../../config').admin_secret

async function login(ctx,next){
    let {name,password} = ctx.request.body;
    try{
        let res = await UserModel.find({name:name});
        if(res.length>0){
            if(res[0].password === password){
                let payload = {
                    _id: res[0]._id,
                    name: res[0].name,
                    date:new Date(),
                }
                let token = jwt.sign(payload, admin_secret, {expiresIn: '24h'})  //t
                let dToken = jwt.decode(token,admin_secret);
                console.log(dToken,"dtoken")
                returnBody(ctx,{
                    token:token,
                    code:200,
                    msg:'success',
                    data:{
                        _id:res[0]._id,
                        name:res[0].name,
                        roles:res[0].roles,
                    }
                })
            }
            else{
                returnBody(ctx,{
                    code:401,
                    msg:'密码错误！'
                })
            }
        }
        else{
            returnBody(ctx,{
                code:402,
                msg:'账户不存在！'
            })
        }
    }
    catch(err){
        throw err
    }
}
async function register(ctx,next){
    let {name,password} = ctx.request.body;
    try{
        let res = await UserModel.find({name:name});
        if(res.length>0){
            returnBody(ctx,{
                code:403,
                msg:"该用户已存在"
            })
        }
        else{
            let newUser = new UserModel(ctx.request.body);
            let res = await newUser.save();
            if(res){
                returnBody(ctx,{
                    code:200,
                    msg:'注册成功'
                })
            }
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
    login,
    register
}