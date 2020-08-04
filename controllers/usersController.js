class usersController {
    static hai(req, res) {
        res.send('respond to Fira. Arigatou');
      }
    static home(req, res){
          res.send('Hello from Home of AppController');
     }
}
module.exports = usersController;