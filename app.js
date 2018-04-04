const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const multer = require('multer');
var fs = require('fs');
var http = require('http');
/*
var ip2loc = require("ip2location-nodejs");
ip2loc.IP2Location_init('./routes/IP-COUNTRY-REGION-CITY-LATITUDE-LONGITUDE-ZIPCODE-TIMEZONE-ISP-DOMAIN-NETSPEED-AREACODE-WEATHER-MOBILE-ELEVATION-USAGETYPE-SAMPLE.BIN');
*/

//Database connect
mongoose.connect(config.database);
//Connected on
mongoose.connection.on('connected', () => {
    console.log('Database connected '+ config.database);
});
//DB Error 
mongoose.connection.on('error', (err) => {
    console.log('Database '+ err);
});

const app = express();

const users = require('./routes/users');
const categorty = require('./routes/categories');
const poll = require('./routes/polls');
const voteduser = require('./routes/votedusers');
const result = require('./routes/results');
const contact = require('./routes/contacts');
 
// Poer number
//const port = 3000; 
const port = process.env.PORT || 80;
/*
var options = {
  key: fs.readFileSync("./nationpulse.in.key"),
  cert: fs.readFileSync("./nationpulse_in.crt"),
  ca: [
          fs.readFileSync('./AddTrustExternalCARoot.crt'),    
          fs.readFileSync('./COMODORSAAddTrustCA.crt'),
          fs.readFileSync('./COMODORSAExtendedValidationSecureServerCA.crt')
       ]
}; 
https.createServer(options, app).listen(443);
*/
//http.createServer(app).listen(port);
// COES middleware
app.use(cors());
 
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); 

app.use('/api/users', users);
app.use('/api/categories', categorty);
app.use('/api/polls', poll);
app.use('/api/votedusers', voteduser);
app.use('/api/results', result); 
app.use('/api/contacts', contact);

// Index router
app.get('/', (req, res) => {
    res.send('Invalied Endpoing');
});
// upload
/*
const upload = multer({
    dest: 'uploads/',
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
      }
    })
  });
   
  app.post('/upload', upload.any(), (req, res) => {
    res.json(req.files.map(file => {
      let ext = path.extname(file.originalname);
      return {
        originalName: file.originalname,
        filename: file.filename
      }
    }));
  });
  */
 /*
  var DIR = './uploads/';
  var upload = multer({dest: DIR});
  app.use(multer({
    dest: DIR,
    rename: function (fieldname, filename) {
      return filename + Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
  }));
  app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.end(err.toString());
      }
   
      res.end('File is uploaded');
    });
  });
  */
 /*
 // Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
 app.post('/upload', (req, res) => {
   console.log(req);
  upload(req, res, (err) => {
    if(err){
      res.json({success: true, data: 'error out'});
    } else {
      if(req.file == undefined){
        res.json({success: true, data: 'error in'});
      } else {
        res.json({success: true, data: 'success in'}); 
      }
    }
  });
});
*/
/*
    const ipresult = ip2loc.IP2Location_get_all('182.76.220.54');
    for (var key in ipresult) {
        console.log(key + ": " + ipresult[key]);
    }
*/
// Start server

app.listen(port, () => {
    console.log("Server started on port " + port);
});

