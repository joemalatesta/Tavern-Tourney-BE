import { TriMatch } from "../models/triMatch.js"

async function index(req, res) {
  try {
    const match = await TriMatch.find({})
    res.json(match)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  req.body.owner = req.user.profile
  TriMatch.create(req.body)
  .then(match => {
    TriMatch.findById(match._id)
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
  TextMetricsMatch.findById(req.params.id)
  .then(match => {
    if (match.owner._id.equals(req.user.profile)) {
      TriMatch.findByIdAndUpdate(req.params.id, req.body, {new: true})
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


function deleteOne(req, res) {
  console.log();
  TriMatch.findById(req.params.id)
  .then(match => {
    
  
      TriMatch.findByIdAndDelete(match._id)
      .then(deletedMatch => {
        res.json(deletedMatch)
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