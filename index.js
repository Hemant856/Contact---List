//importing express 
const express  = require('express');
//path is inbuild module in node js 
const path = require('path');
//as we know server runs on the port
const port = 8001;

//now app has all the functionality 
// of express 
const app = express();

//It set the view engine as ejs
app.set('view engine', 'ejs');




app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
    // console.log(__dirname);
    // return res.render('./profile');
    return res.render('./home');
});

app.listen(port, function(err){
    if(err){
        console.log('Error in the server', err);
    }
    console.log('Yup! my Express Server is running on port', port);
});