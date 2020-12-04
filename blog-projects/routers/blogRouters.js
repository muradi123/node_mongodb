const express = require('express');
const router  = express.Router();
const Blog = require('../models/blog')

router.get('/', (req,res)=>{
    res.redirect('/blogs')
})

router.get('/blogs' , (req,res)=>{
  Blog.find().sort({createdAt:-1})
  .then((result)=>{
    res.render('index', {title:'home page', result: result.map(result => result.toJSON())})
 })  
  .catch((err)=> console.log(err)) 
})


router.get('/blog-create' , (req,res)=>{
    res.render('add-blog', {title:'blog create'})
})

router.get('/blogs/:id',  (req,res)=>{
    const id = req.params.id;
    console.log(id)
    Blog.findById(id)
    .then(result=>{
       
        res.render('details', {
             blog: result.toJSON(),
             title:'Details page'
        })
    })
    .catch(()=>{
        res.render('404' , {
            title:'blog not found'
    })
  })
})

router.post('/blogs', (req,res)=>{
  const blog = new Blog(req.body);
  blog.save()
  .then((result)=>{
      res.redirect('/')
  })
  .catch((err)=> console.log(err))
})


router.delete('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
    res.json({redirect: '/blogs'})
    })
})



module.exports = router;