const NewsModel = require("../models/newsModel");

exports.getNewsItems = async (req, res) => {
    try {
      const getevents = await NewsModel.find({}).sort({ dateCreated: 1 });
      console.log(getevents);
      res.send(getevents);
    } catch (e) {
      res.status(400).send(e);
    }
  }

exports.createNewsItem = async (req,res)=>{
  try {
    if (req.body.password !== process.env.passKey) {
      res.status(400).send("Invalid Password");
    }
    else{
      const newsEvent = await NewsModel.create(req.body);
      res.status(201).send(newsEvent);
    } 
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.updateNewsItem = async (req, res) => {
    try {
      const _id = req.params.id;
      const getevent = await NewsModel.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      res.send(getevent);
    } catch (e) {
      res.status(500).send(e);
    }
  }

exports.deleteNewsItem = async (req, res) => {
    try {
      const getevent = await NewsModel.findByIdAndDelete(req.params.id);
      res.send(getevent);
    } catch (e) {
      res.status(500).send(e);
    }
  }