import { Team } from "../models/team.js"

async function index(req, res) {
  try {
    const team = await Team.find({})
    res.json(team)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  req.body.owner = req.user.profile
  Team.create(req.body)
    .then((team) => {
      Team.findById(team._id)
        .populate("teamPlayers")
        .exec()
        .then((populatedTeam) => {
          res.json(populatedTeam)
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req, res) {
  console.log(req.params)
  Team.findById(req.params.id)
    .then((team) => {
      Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (updatedTeam) => {
          res.json(updatedTeam)
        }
      )
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ err: err.message })
    })
}

function deleteOne(req, res) {
  console.log()
  Team.findById(req.params.id)
    .then((team) => {
      Team.findByIdAndDelete(team._id).then((deletedTeam) => {
        res.json(deletedTeam)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

// async function findOne(req, res) {
//   console.log(req.params)
//   try {
//     const team = await Team.findById(req.params.id).populate("teamPlayers")
//     res.json(team)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err)
//   }
// }
async function findOne(req, res) {
  console.log("TEAM FIND ONE PARAMS:", req.params)
  console.log("TEAM FIND ONE ID:", req.params.id)

  try {
    const team = await Team.findById(req.params.id)
      .populate("teamPlayers")

    console.log("TEAM FIND ONE RESULT:", team)

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        id: req.params.id,
      })
    }

    return res.json(team)
  } catch (err) {
    console.error("TEAM FIND ONE ERROR:", err)
    return res.status(500).json({ error: err.message })
  }
}

export { index, create, update, deleteOne, findOne }
