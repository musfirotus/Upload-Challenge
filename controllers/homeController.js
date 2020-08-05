const todoModel = require("../models/taskModel");
const multer = require("multer")
const path = require("path")
const fs = require("fs");
const pug = require("pug");
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
          await todoModel.findByIdAndDelete({ _id: req.params.id})
          res.redirect('/')
     }

     static async done(req, res){
          await todoModel.updateOne({
               _id: req.params.id
          }, {
          status: true
          }, error)
          res.redirect("/");
     }

     static async undone(req, res) {
          await todoModel.updateOne({
               _id: req.params.id
          }, {
          status: false
          }, error)
          res.redirect("/");
     }

     static async detail(req, res) {
          const list = await todoModel.findById({ _id: req.params.id})
          res.render('detail', { todo:list})
     }
      
     static async details(req, res) {
          console.log("Berhasil Edit list");
          const { params, file, body } = req;
          const image = file === undefined ? "nullObj" : "imageFile";
          todoModel.updateOne(
            { _id: req.body.id },
            {
              $set: {
                name: body.name,
                description: body.description,
                date: new Date(),
                [image]: file,
              },
            },
            { multi: true, new: true }
          ).then((res) => res.redirect("/"));
     }
}
module.exports = homeController;

