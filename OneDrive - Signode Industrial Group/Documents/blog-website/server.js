const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => { 
    console.log(req.url, req.method); 
    
    // function for the content type being sent back to the browser
    res.setHeader('Content-Type', 'text/html');

    // we want to direct users to different pages based on which url they entered
    let path = './html/'; // folder with all our files
    switch(req.url){ // checking which case the requested url is equal to
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // REDIRECT 
        case '/about-me':
            res.statusCode = 301; // redirect code
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // or send back an entire html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});