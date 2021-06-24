const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("Response");
});

// "/users/:id?" faz do parâmetro algo obrigatório
app.get("/users/:id", function(req, res){
  var user = {
    id: req.params.id,
    name: req.query["name"]
  };
  res.json(user);
});

app.listen(3001, function(erro){
  if(erro){
    console.log("ERROR!")
  }else{
    console.log("Server started!")  
  }
});
