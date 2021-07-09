const express = require('express');
const app = express();
const connection = require('./database/database')

// Database config
connection.authenticate()
          .then(() => {
            console.log('DB connected!')
          }).catch((error) => {
            throw new Error(error);
          });

// Parser for requests with body
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

// Use EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.listen(3000, () => {});
