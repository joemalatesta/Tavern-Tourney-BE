import { Player } from "../models/player.js"

async function index(req, res) {
  try {
    const player = await Player.find({})
    res.json(player)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {

  req.body.owner = req.user.profile

  Player.create(req.body)
  .then(player => {
   
    Player.findById(player._id)
    .populate('owner')
    .then(populatedPlayer => {
      res.json(populatedPlayer)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {

  Player.findById(req.params.id)
  .then(player => {
    if (player.owner._id.equals(req.user.profile)) {
  
      Player.findByIdAndDelete(player._id)
      .then(deletedPlayer => {
        res.json(deletedPlayer)
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

function update(req, res) {
  Player.findById(req.params.id)
  .then(player => {
    if (player.owner._id.equals(req.user.profile)) {
      Player.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedPlayer => {
        res.json(updatedPlayer)
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
  create,
  index,
  deleteOne as delete,
  update
}