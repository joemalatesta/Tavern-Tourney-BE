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

async function update(req, res) {
  try {
    console.log("Updating team ID:", req.params.id)
    console.log("Update request body:", req.body)
    console.log("Database name:", Team.db.name)
    console.log("Team collection:", Team.collection.name)
    console.log("Requested team ID:", req.params.id)

    const existingTeam = await Team.findById(req.params.id)

    console.log("Team found before update:", existingTeam)

    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedTeam) {
      console.error("Team not found:", req.params.id)
      return res.status(404).json({
        message: "Team not found",
        teamId: req.params.id,
      })
    }

    console.log("Updated team in database:", {
      teamName: updatedTeam.teamName,
      wins: updatedTeam.wins,
      loss: updatedTeam.loss,
    })

    return res.status(200).json(updatedTeam)
  } catch (err) {
    console.error("Team update failed:", err)

    return res.status(500).json({
      message: "Failed to update team",
      error: err.message,
    })
  }
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
async function findOne(req, res) {
  console.log("TEAM FIND ONE PARAMS:", req.params)
  console.log("TEAM FIND ONE ID:", req.params.id)

  try {
    const team = await Team.findById(req.params.id).populate("teamPlayers")

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
