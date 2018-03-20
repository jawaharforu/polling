const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const multer = require('multer');

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
 
// Poer number
const port = 3000; 

// COES middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); 

app.use('/api/users', users);
app.use('/api/categories', categorty);
app.use('/api/polls', poll);
app.use('/api/votedusers', voteduser);
app.use('/api/results', result); 

// Index router
app.get('/', (req, res) => {
    res.send('Invalied Endpoing');
});
// upload
const upload = multer({
    dest: 'mdb-angular-pro/src/img/',
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
// Start server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
