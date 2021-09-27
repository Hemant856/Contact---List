//importing express 
const exp = require('constants');
const express  = require('express');
//path is inbuild module in node js 
const path = require('path');
//as we know server runs on the port
const port = 8001;


const db = require('./config/mongoose');
const Contact = require('./models/contact');

//now app has all the functionality 
// of express 
const app = express();

//It set the view engine as ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded());
// Create contact list
app.use(express.static('assets'));

contactList = [
    {
       name: "Hemant Raj",
       phone: "1111111111"
    },
    {
        name: "Ankur",
        phone: "8787686"
    },
    {
        name: "Tom",
        phone: "6567587"
    }
]



app.set('views', path.join(__dirname, 'views'));



app.get('/', function(req, res){
    // console.log(__dirname);
    // return res.render('./profile');
    //fetching contacts from database
    Contact.find({}, function(err, all_contacts){
        if(err){console.log('error in fecthing contacts'); return;}
        return res.render('./home',{
            title: "My Contact List",
            Contact_List: all_contacts
        });
    })


    
});



app.get('/practice', function(req,res){
     return res.render('practice', {
        title: "play with ejs"
     });
});

app.post('/create-contact', function(req, res){
//    return res.redirect('/practice');
//    console.log(req.body);
    //    contactList.push({
    //        name: req.body.name,
    //        phone: req.body.phone
    //    });
    //   contactList.push(req.body);
     Contact.create({
         name: req.body.name,
         phone: req.body.phone
     }, function(err, newContact){
         if(err){console.log('error in creating a contact'); return;}

         console.log('********', newContact);
         return res.redirect('back');


     });
    
});

// Deleting contact list

app.get('/delete-contact', function(req,res){

    // console.log(req.query);
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // return res.redirect('back');

// get id from query in the url

let id = req.query.id;

// find the contact in the database using id and delete
Contact.findByIdAndDelete(id, function(err){
  if(err){
      console.log('error in deleting an object from database');
      return;
  }
  return res.redirect('back');
});

});


app.listen(port, function(err){
    if(err){
        console.log('Error in the server', err);
    }
    console.log('Yup! my Express Server is running on port', port);
});