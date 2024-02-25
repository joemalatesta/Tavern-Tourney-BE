import { League } from "../models/league.js"

async function index(req, res) {
  try {
    const league = await League.find({})
    res.json(league)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  req.body.owner = req.user.profile
  League.create(req.body)
  .then(league => {
    League.findById(league._id)
    .then(populatedLeague => {
      res.json(populatedLeague)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  League.findById(req.params.id)
  .then(league => {
    if (league.owner._id.equals(req.user.profile)) {
      League.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedLeague => {
        res.json(updatedLeague)
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


function deleteOne(req, res) {
  console.log();
  League.findById(req.params.id)
  .then(league => {
      League.findByIdAndDelete(league._id)
      .then(deletedLeague => {
        res.json(deletedLeague)
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
  update,
  deleteOne
}