import { PlayedMatch } from "../models/playedMatch.js"

async function index(req, res) {
  try {
    const match = await PlayedMatch.find({})
    res.json(match)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function findOne(req, res) {
  console.log(req.params)
  try {
    const match = await PlayedMatch.findById(req.params.id)
    res.json(match)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  const matchData = req.body.gameData;

  PlayedMatch.create(matchData)
    .then((match) => {
      PlayedMatch.findById(match._id)
        .populate('winningTeam losingTeam winningPlayer losingPlayer')
        .exec()
        .then((populatedMatch) => {
          console.log("Created and Populated Match:", populatedMatch);
          res.json(populatedMatch);
        })
        .catch((populateError) => {
          console.error("Error populating match details:", populateError);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function deleteOne(req, res) {
  PlayedMatch.findById(req.params.id).then((match) => {
    PlayedMatch.findByIdAndDelete(match._id)
      .then((deletedMatch) => {
        res.json(deletedMatch)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ err: err.errmsg })
      })
  })
}

function update(req, res) {
  PlayedMatch.findById(req.params.id)
    .then((match) => {
      PlayedMatch.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedMatch) => {
          res.json(updatedMatch)
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

export { create, index, deleteOne as delete, update, findOne }
