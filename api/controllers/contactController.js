const contactModel = require('../models/contact')

/**
 * @swagger
 * /api/v0/contact/create:
 *   post:
 *     tags:
 *     - users
 *     description: Add a new user to DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             category:
 *               type: string
 *             name:
 *               type: string
 *             service:
 *               type: string
 *             designation:
 *               type: string
 *             phoneNumber:
 *               type: number
 *             email:
 *               type: string
 *             websiteURL:
 *               type: string
 * 
 *     responses:
 *       201:
 *         description: New user added to DB
 *       400:
 *         description: Error message(s)
 */

exports.createcontact = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    contactModel.findOne({ name: req.body.email }).then((currenUser) => {
        if (currenUser) {
            res.send({ message: "Email already exits" });
        }
        else {
            new contactModel({
                name       : req.body.name,
                designation: req.body.designation,
                service    : req.bosy.service,
                phoneNumber: req.body.phoneNumber,
                email      : req.body.email,
                websiteURL : req.body.websiteURL
            }).save().then(data => {
                res.send({ message: "User saved" })
            })
        }
    })
}

exports.updatecontact = (req, res) => {
    const id = req.params.id;
    contactModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
}

exports.deletecontact = (req, res) => {
    const id = req.params.id;

    contactModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
}


