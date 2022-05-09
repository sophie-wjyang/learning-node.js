// process:
// create.ejs sends a POST request 
// middleware parses the request and turns it into an object
// GET request to display our data

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// IMPORT FILE WITH BLOG ROUTES
const blogRoutes = require('./routes/blogRoutes')

// CREATE EXPRESS APP
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
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// ROUTES
// responding in express
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => { 
    res.status(404).render('404', {title: '404'});

});

