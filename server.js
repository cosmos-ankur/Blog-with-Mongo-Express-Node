const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const methodOverride = require('method-override')
const articleRoute = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>{
    console.log('Database Connected')
});

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/', async(req,res)=>{
    const articles = await Article.find().sort({ createdAt : 'desc'})
   
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRoute)

app.listen(4600,()=>{
    console.log('listening at port 4600')
})