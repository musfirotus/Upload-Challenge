const todoModel = require("../models/taskModel");
const multer = require("multer")
const path = require("path")
const fs = require("fs");
const { findByIdAndDelete } = require("../models/taskModel");
// callback untuk error
const error = (error, result) => {
     console.log(error, result);
 }
class homeController {
     static async tampil(req, res){
          await todoModel.find({})
            .then((response) => {
                console.log(response);
                res.render('todo', {
                    todo: response
                });
            })
            .catch((err) => console.log(err));
     }

     static async add(req, res){
          const addTodo = todoModel({
               name: req.body.name,
               description: req.body.description
          })
          await addTodo.save(error)
          console.log(addTodo);
          res.redirect('/')
     }

     static async delete(req, res){
          console.log("Berhasil Delete");
          todoModel.findByIdAndRemove({
               _id: req.params.id,
          })
               .then((response) => res.redirect(301, "/"))
               .catch((err) => err);
     }
}
module.exports = homeController;

