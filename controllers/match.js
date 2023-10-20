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
  console.log(req.body);
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

function update(req, res) {
  Match.findById(req.params.id)
  .then(match => {
    if (match.owner._id.equals(req.user.profile)) {
      Match.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedMatch => {
        res.json(updatedMatch)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  index,
  create,
  update
}