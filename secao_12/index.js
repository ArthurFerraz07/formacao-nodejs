const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const RECORDS_NUMBER = 10;

var i;
var DB = {};

function buildUser(name, email){
  if(!name){ throw 'Missing name' }
  if(!email){ throw 'Missing email' }

  return({
    name: name,
    email: email
  });
}

function buildPost(userId, content){
  if(!userId){ throw 'Missing userId' }
  if(!content){ throw 'Missing content' }

  return({
    userId,
    content
  });
}

function saveRecord(table, record){
  if(!DB[table]){ DB[table] = [] }

  record = { ...record, ...{ id: ((DB[table].length || 0) + 1) } }
  DB[table].push(record);
  return record;
}

function populateDB(){
  for(i = 1; i <= RECORDS_NUMBER; i++){
    var user = buildUser(`User${i}`, `user${i}@emails.com`)
    user = saveRecord('users', user);
  };
}

function byId(record, id){
  return record.id == id;
}

function indexById(records, id){
  return records.findIndex(record => record.id == id);
}

function badRequest(res, error = nil){
  res.statusCode = 400;
  res.json({
    error: 'Bad request' || error
  });
}

function success(res, json){
  res.statusCode = 200;
  res.json(json);
}

function notFound(res){
  res.statusCode = 404;
  res.json({
    error: 'Not Found'
  });
}

// Index
app.get('/users', (req, res) =>{
  res.statusCode = 200;
  res.json(DB.users);
});

// Show
app.get('/users/:id', (req, res) => {
  var id = req.params.id;
  if(!id || isNaN(id)) {
    return badRequest(res)
  }

  var user = DB.users.find((record) => byId(record, id));
  if(user){
    success(res, user);
  } else {
    notFound(res);
  };
});

// Create
app.post('/users', (req, res) => {
  var { name, email } = req.body;

  try {
    var user = saveRecord('users', buildUser(name, email));
    success(res, user);
  } catch (err) {
    badRequest(res, err)
  }
});

// Update
app.put('/users/:id', (req, res) => {
  var id = req.params.id;
  if(!id || isNaN(id)) {
    return badRequest(res)
  }

  var user = DB.users.find((record) => byId(record, id));
  if(user){
    var new_attributes = {
      ...user,
      ...req.body.name && { name: req.body.name },
      ...req.body.email && { email: req.body.email }
    }

    if(buildUser(new_attributes.name, new_attributes.email)){
      user.name = new_attributes.name;
      user.email = new_attributes.email;
      success(res, user);
    } else {
      badRequest(res)
    }

  } else {
    notFound(res);
  };
});

// Delete
app.delete('/users/:id', (req, res) => {
  var id = req.params.id;
  if(!id || isNaN(id)) {
    return badRequest(res)
  }

  var userIndex = indexById(DB.users, id);
  if(!(userIndex < 0)){
    DB.users.splice(userIndex, 1);
    success(res, {});
  } else {
    notFound(res);
  };
});

app.listen(3001, () => {
  populateDB();
  console.log('Server running');
});
