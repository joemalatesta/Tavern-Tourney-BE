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


async function update(req, res) {
  try {
    const updates = { ...req.body }

    // These fields must not be updated through the request body.
    delete updates._id
    delete updates.__v
    delete updates.owner
    delete updates.createdAt
    delete updates.updatedAt

    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedMatch) {
      return res.status(404).json({
        error: "Match not found",
      })
    }

    res.json(updatedMatch)
  } catch (err) {
    console.error("Error updating match:", err)
    res.status(500).json({
      error: err.message,
    })
  }
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
