const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');
const Answer = require('./database/Answer');

// DB Connection
connection.authenticate()
          .then(() => {
            console.log('Connection with DB stabilished');
          })
          .catch((error) => {
            throw new Error(error);
          })

// Use EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

// Use bodyParser as post requests bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Application routes
// Question Index
app.get('/', (req, res) => {
  Question.findAll({raw: true, order: [['createdAt', 'DESC']]}).then(questions => {
    res.render('', {
      questions: questions
    });
  });
});

// Question New
app.get('/questions', (req, res) => {
  res.render('questions/ask.ejs');
});

// Question Create
app.post('/questions', (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
 
  Question.create({
    title: title,
    body: body
  }).then(() => {
    res.redirect('/');
  });
});

// Question Answer
app.get('/questions/:id', (req, res) => {
  var id = req.params.id;

  Question.findOne({where: {id: id} }).then(question => {
    if(question){
      Answer.findAll({where: { questionId: question.id }, order: [['id', 'desc']]}).then((answers) => {
        res.render('questions/answer', {
          question: question,
          answers: answers ? answers : []
        });
      })
    }else{
      res.redirect('/');
    }
  });
})

// Answer Create
app.post('/answers', (req, res) => {
  var questionId = req.body.questionId;
  var body = req.body.body;
 
  Answer.create({
    questionId: questionId,
    body: body
  }).then(() => {
    res.redirect('/questions/' + questionId);
  });
});

app.listen(3000, () => {
  console.log('Server started!');
});
