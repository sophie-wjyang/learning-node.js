const fs = require('fs');

const readStream = fs.createReadStream('./blogs/blog1.txt', {encoding: 'utf8'}); // read data from blog1
const writeStream = fs.createWriteStream('./blogs/blog2.txt'); // write it into blog2

readStream.pipe(writeStream);
