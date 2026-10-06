/*Goal: Create a simple web application that uses the fs and http modules to validate if a string is a palindrome server side.*/
// Take a string from input and make each character an array
// If conditional that checks if the array is a palindrome by calling it backwards

// function solution(str){
//   return str.split('').reverse().join('');
// }

// .split(''): Splits the string into an array of individual characters
// .reverse(): Reverses the order of the elements in that array in place
// .join(''): Joins all elements of the array back into a single string


const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');


const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });

  } else if (page == '/api') {
      let input = params.pali //leon, noel
      let cleanStr = input.toLocaleLowerCase().replace(/[^a-z0-9]/g,"")//leonnoel
      let reverseStr = cleanStr.split('').reverse().join('');

      let result = {pali : `${input} is not a Palindrome`}
      console.log(params)
    if ('pali' in params) {
        if( cleanStr === reverseStr){

          result.pali = `${input} is a Palindrome`

        }else{
          result.pali = `${input} is NOT a Palindrome`
        }
        console.log(result)
       res.write(JSON.stringify(result));
       res.end();
    }
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });

  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
