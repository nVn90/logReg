const express = require('express')
const PORT = 1234
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/Users')

mongoose.connect('mongodb://localhost:27017/usersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/register', (req, res)=>{
  res.render('register')
})

app.get('/login', (req, res)=>{
  res.render('login')
})

//POST REQUESTS GOES HERE

// Register
app.post('/register', (req, res)=>{
  const email = req.body.email; // nvn@nvn@gmail.com
  const password = req.body.password; // 123456

  const newUser = new User({
    email: email,
    password: password
  })

  newUser.save(err => {
    err ? console.log(err) : res.render('login')
  })
})


// Login
app.post('/login', (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, foundResults)=>{
    if (err) {
      console.log(err);
    } else {
      if (foundResults.password === password) {
        res.render('dashboard');
      } else {
        res.send("Incorrect Email Or Password")
      }
    }
  })
})

app.listen(PORT, ()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})