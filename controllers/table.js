import { Table } from "../models/table.js"

async function index(req, res) {
  try {
    const table = await Table.find({}).populate(["match1","match2","match3"])
    res.json(table)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}


// async function index(req, res) {
//   try {
//     const schedule = await Session.find({}).populate([
//       "table1",
//       "table2",
//       "table3",
//       "table4",
//     ])
//     res.json(schedule)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err)
//   }
// }

async function findOne(req, res) {
  try {
    const table = await Table.findById(req.params.id).populate(["match1","match2","match3"])
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
  Table.findById(req.params.id)
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
  Table.findById(req.params.id)
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