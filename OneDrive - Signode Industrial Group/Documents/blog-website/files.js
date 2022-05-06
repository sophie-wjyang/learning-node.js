const fs = require('fs');

// reading files
fs.readFile('./blogs/blog1.txt', (err, data) => { // we pass the readFile method a path and a function (with parameters err and data)
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});

// writing files
fs.writeFile('./blogs/blog1.txt', 'Replacement text', () => {
    console.log('file was written');
    // once this runs, whatever was in blog1.txt will be replaced by the string "Replacement text"
});

// directories
fs.mkdir('./assets', (err) =>{
    if(err){
        console.log(err);
    }
    console.log('folder created');
})

// deleting files
if(fs.existsSync('./blogs/deleteme.txt')){ // check that the file exists
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err)
        }
        console.log('file deleted');
    })
}