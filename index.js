const express = require('express');
const path = require('path');
const Blog = require('./Models/blogs');
const mongoose = require('mongoose');
const methodOverride=require("method-override")
const app = express();

mongoose.connect('your_mongo_db_link')//update this
    .then(() => {
        console.log("db connected");
    }).catch(() => {
        console.log("db not connected")
    })


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// task1 -> display all the blogs
app.get('/blog', async (req, res) => {

    let allBlogs = await Blog.find({});
    res.render('index', { allBlogs });
})

app.get('/blog/new', (req, res) => {
    res.render('new');
})

app.post('/blog', (req, res) => {
    let { title, author, comment } = req.body;
    let newBlog = Blog.create({ title, author, comment });
    res.redirect('/blog')
})

app.get('/blog/:id', async (req, res) => {
    let { id } = req.params;
    let foundProduct = await Blog.findById(id);
    res.render('show', { foundProduct })
})

app.get('/blog/:id/edit', async (req, res) => {
    let { id} = req.params;
    let foundProduct = await Blog.findById(id);
    res.render('edit', { foundProduct });
})

app.patch('/blog/:id' , async(req,res)=>{
    let {id} =  req.params;
    // console.log(req.params.id);
    let {comment} = req.body;
    // console.log(req.body.comment)
    await Blog.findByIdAndUpdate(id , {comment});
    res.redirect('/blog')
})

// deleting
app.delete('/blog/:id' , async(req,res)=>{
    let {id} =  req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blog')
})

app.listen(8080, () => {
    console.log("server is connected to port 8080")
})
