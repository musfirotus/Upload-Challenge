const createError = require('http-errors');
const express = require('express');
const mongoose = require("mongoose")
const db = require('./controllers/db')
const todoModel = require('./models/taskModel')
const bodyParser = require("body-parser")
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// callback untuk error
const error = (error, result) => {
  console.log(error, result);
}
// Mencari Data
const getTodo = async () => {
  return await todoModel.find({});
}
// Menampilkan data
app.get('/', async (req, res) => {
  const todoList = await getTodo()
      .then((response) => {
          console.log(response);
          res.render('todo', {
              todo: response
          });
      })
      .catch((err) => console.log(err));
  console.log({
      todoList
  });
})
// Tambah Data
app.post('/', async (req, res) => {
  const addTodo = todoModel({
      name: req.body.name,
      description: req.body.description
  })
  await addTodo.save(error)
  console.log(addTodo);
  res.redirect('/')
})
// Detail Data
app.get("/detail/:_id?", async (req, res) => {
  const todoList = await getTodo();
  let task = null;
  if (req.params._id !== undefined) {
    tasks = await todoList.find((e) => e._id == req.params._id);
    res.render("details", { task });
  } else {
    res.render("detail", { tasks: todoList });
  }
});
app.post("/tododetails", async (req, res) => {
  await todoModel.updateOne({_id:req.body._id},{name:req.body.name, description:req.body.description},error)
  res.redirect("/");
});
// Hapus data
app.get("/:id?/del", async (req, res) => {
  await todoModel.deleteOne({
      _id: req.params.id
  }, error)
  res.redirect("/");
});
// Ubah data menjadi Done
app.get("/:id?/done", async (req, res) => {
  await todoModel.updateOne({
      _id: req.params.id
  }, {
      status: true
  }, error)
  res.redirect("/");
});
// Ubah data menjadi Undone
app.get("/:id?/undone", async (req, res) => {
  await todoModel.updateOne({
      _id: req.params.id
  }, {
      status: false
  }, error)
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
