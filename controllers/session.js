import { Session } from "../models/session.js"

async function index(req, res) {
  try {
    const schedule = await Session.find({}).populate([
      "table1",
      "table2",
      "table3",
      "table4",
    ])
    res.json(schedule)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  Session.create(req.body)
    .then((schedule) => {
      Session.findById(schedule._id)
        .populate(["table1", "table2", "table3", "table4"])
        .then((populatedSession) => {
          res.json(populatedSession)
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req, res) {
  Session.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate(["table1", "table2", "table3", "table4"])
    .then((updatedSession) => {
      res.json(updatedSession)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function deleteOne(req, res) {
  Session.findByIdAndDelete(req.params.id)
    .populate(["table1", "table2", "table3", "table4"])
    .then((deletedSession) => {
      res.json(deletedSession)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

async function findOne(req, res) {
  try {
    const session = await Session.findById(req.params.id).populate([
      "table1",
      "table2",
      "table3",
      "table4",
    ])
    res.json(session)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { index, create, update, deleteOne, findOne }
