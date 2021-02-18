const postsRouter = require('express').Router();
const Post = require('../models/posts');

postsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/', async (req, res) => {
    const auth = req.currentUser;
    if (auth){
        const post = new Post(req.body)
        const savedPost = post.save()
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
    
});

postsRouter.put('/:id',(req,res)=>{
    const auth = req.currentUser;
    if (auth){
    Post.findById(req.params.id, async function(err,post){
        if(err){
            res.send(err)
        }
        console.log(req.body)
        console.log(post)
        post.like = parseInt(req.body.like,10) + 1;
        const savePost = post.save( function(err){
            if(err){
                res.send(err)
            }
            res.json({message:'Update ok'})
        })
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
    })
}
})

module.exports = postsRouter;
