import { TriMatch } from "../models/triMatch.js"

async function index(req, res) {
  try {
    const triMatches = await TriMatch.find({}).populate(['match1', 'match2', 'match3']);
    res.json(triMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function findOne(req, res) {
  try {
    const triMatch = await TriMatch.findById(req.params.id).populate(['match1', 'match2', 'match3']);
    res.json(triMatch);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}


async function create(req, res) {
  try {
    const newTriMatch = await TriMatch.create(req.body)
    const populatedTriMatch = await TriMatch.findById(newTriMatch._id).exec()
    res.json(populatedTriMatch)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

function deleteOne(req, res) {
  TriMatch.findById(req.params.id).populate(["match"])
    .then((table) => {
      TriMatch.findByIdAndDelete(table._id).then((deletedTriMatch) => {
        res.json(deletedTriMatch)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req, res) {
  TriMatch.findById(req.params.id).populate(["match1","match2","match3"])
    .then((table) => {
      TriMatch.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (updatedTriMatch) => {
          res.json(updatedTriMatch)
        }
      )
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

export { create, index, deleteOne as delete, update, findOne }
