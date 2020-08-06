const Router = require('koa-router');
const router = new Router();
const User = require('../control/admin/user')
const Blog = require('../control/admin/blog')


router.post('/login',async (ctx,next) => {
    await User.login(ctx,next)
})



router.post('/register',async (ctx,next) => {
    await User.register(ctx,next)
})



router.post('/blog/index',async (ctx,next) => {
    await Blog.listArticle(ctx,next)
})

router.post('/blog/add',async (ctx,next) => {
    await Blog.addArticle(ctx,next)
})

router.post('/blog/delete',async (ctx,next) => {
    await Blog.deleteArticle(ctx,next)
})

module.exports = router