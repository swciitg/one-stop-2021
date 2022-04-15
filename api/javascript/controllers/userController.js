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
