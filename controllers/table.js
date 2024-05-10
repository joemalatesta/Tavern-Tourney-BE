import { Table } from "../models/table.js"

async function index(req, res) {
  try {
    const table = await Table.find({}).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    res.json(table)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function findOne(req, res) {
  try {
    const table = await Table.findById(req.params.id).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    res.json(table)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    const newTable = await Table.create(req.body)
    const populatedTable = await Table.findById(newTable._id).exec()
    res.json(populatedTable)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

function deleteOne(req, res) {
  Table.findById(req.params.id).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    .then((table) => {
      Table.findByIdAndDelete(table._id).then((deletedTable) => {
        res.json(deletedTable)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req, res) {
  Table.findById(req.params.id).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    .then((table) => {
      Table.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (updatedTable) => {
          res.json(updatedTable)
        }
      )
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

export { create, index, deleteOne as delete, update, findOne }
