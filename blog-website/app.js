const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// import blog model
const Blog = require('./models/blog'); 
const { render } = require('ejs');

// CREATE EXPRESS APP
// invoking the function stored in "express" to create an instance of an express app
const app = express();

// CONNECT TO MONGODB
const dbURI = 'mongodb+srv://first-user:test123@blog-website.uegsk.mongodb.net/blog-website?retryWrites=true&w=majority'; // connection string
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // useNewUrlParser and useUnifiedTopology avoids a deprecation warning
    .then((result) => app.listen(3000)) // we are only listening for requests after the connection has been made
    .catch((err) => console.log(err));

// REGISTER VIEW ENGINE
app.set('view engine', 'ejs');
// will automatically search for ejs files in the "views" folder

// STATIC FILES
app.use(express.static('public')); // by adding this, anything in the folder "public" can be used as a static file by the front end

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true})); // parses the request and turns it into an object
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });


// ROUTES
// responding in express
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body); // create new object

    blog.save()
        .then((result) => {
            res.redirect('/blogs'); // redirect back to "all blogs" after submitting new blog
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'});
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

// 404 page
app.use((req, res) => { 
    res.status(404).render('404', {title: '404'});

})

// process:
// create.ejs sends a POST request 
// middleware parses the request and turns it into an object
// GET request to display our data
