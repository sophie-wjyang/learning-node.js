const express = require('express');
const mongoose = require('mongoose');

// EXPRESS APP
// invoking the function stored in "express" to create an instance of an express app
const app = express();

// CONNECTION STRING TO CONNECT TO MONGODB
const dbURI = 'mongodb+srv://first-user:test123@blog-website.uegsk.mongodb.net/blog-website?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // useNewUrlParser and useUnifiedTopology avoids a deprecation warning
    .then((result) => app.listen(3000)) // we are only listening for requests after the connection has been made
    .catch((err) => console.log(err));

// REGISTER VIEW ENGINE
app.set('view engine', 'ejs');
// will automatically search for ejs files in the "views" folder

// MIDDLEWARE
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next(); // we need this so that it can proceed in the code
})

// STATIC FILES
app.use(express.static('public')); // by adding this, anything in the folder "public" can be used as a static file by the front end

// RESPONDING IN EXPRESS
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: 'Home', blogs}); 
    // "title" is a dynamic object that we are passing to the index.ejs file
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

app.use((req, res) => { 
    res.status(404).render('404', {title: '404'});

})