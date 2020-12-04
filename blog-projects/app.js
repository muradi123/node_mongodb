const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port  = 5000;
const expHbs = require('express-handlebars');
const blogRouters = require('./routers/blogRouters')
const mongoURI = 'mongodb+srv://murad:skillet123@cluster0.kazvq.mongodb.net/blogs-creater?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
  useNewUrlParser:true,
  useUnifiedTopology:true
  })
  .then((result)=>{
  app.listen(port, () => console.log(`port is running at ${port}`))
  console.log('connected to tb')
  })
  .catch(()=>{
  console.log('error')
  })

const hbs = expHbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
 });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended:true}));
app.use(blogRouters)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use('/:id', (req,res) =>{
  let host = req.params.id;
  res.status(404).render('404' , {host: host, title:'eror page'})
})