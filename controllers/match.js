import { Match } from "../models/match.js"

async function index(req, res) {
  try {
    const match = await Match.find({})
    res.json(match)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  req.body.owner = req.user.profile
  Match.create(req.body)
    .then((match) => {
      Match.findById(match._id).then((populatedMatch) => {
        res.json(populatedMatch)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req, res) {
  Match.findById(req.params.id)
    .then((match) => {

        Match.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((updatedMatch) => {
            res.json(updatedMatch)
          })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function deleteOne(req, res) {
  console.log()
  Match.findById(req.params.id)
    .then((match) => {
      Match.findByIdAndDelete(match._id).then((deletedMatch) => {
        res.json(deletedMatch)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

async function findOne(req, res) {
  try {
    const match = await Match.findById(req.params.id)
    res.json(match)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { index, create, update, deleteOne, findOne }
