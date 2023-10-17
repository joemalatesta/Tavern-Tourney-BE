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
  
  Match.create(req.body)
  .then(match => {
    Match.findById(match._id)
    .then(populatedMatch => {
      res.json(populatedMatch)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  index,
  create,
}