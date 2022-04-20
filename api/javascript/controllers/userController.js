const { writeResponse } = require("../helpers/response");
const User = require("../models/users");

/**
 * @swagger
 * /api/v0/hello/{name}:
 *   get:
 *     tags:
 *     - users
 *     description: Wishes the user hello
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: The user's name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Send a hello response to the user
 *       400:
 *         description: Error message(s)
 */
exports.getGreetings = (req, res) => {
  const { name } = req.params;

  if (!name) {
    throw new Error({ message: "name parameter is missing", status: 400 });
  }

  const response = { message: `Hello from the other side ${name}!` };
  writeResponse(res, response);
};

exports.getAllUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      res.json(data);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id).then((data) => {
    res.send({
      message: "User was deleted successfully!",
    });
  });
};

exports.deletemanyUsers = (req,res) => {
  const arr= req.body.id;

  if(typeof(arr) != "string"){
   
    var arr2 = Object.values(arr);
     for(const id of arr2){
        User.findByIdAndDelete(id).then((data)=>{});
        console.log(id);
     }
     res.send({message: "deleted many"});
  }else{
    User.findByIdAndDelete(arr).then((data)=>{res.send({message: "deleted one of one"})});
  }
  
}
