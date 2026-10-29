
import mongoose from "mongoose"
import { Table } from "../models/table.js"
import { Team } from "../models/team.js"

async function populateCurrentTeams(table) {
  if (!table) return table

  const tableData = table.toObject
    ? table.toObject()
    : { ...table }

  const getTeamId = (team) => {
    if (!team) return null

    if (typeof team === "string") return team

    return team._id || team.id || null
  }

  const populateTeam = async (team) => {
    const teamId = getTeamId(team)

    if (!teamId || !mongoose.isValidObjectId(teamId)) {
      return team
    }

    const currentTeam = await Team.findById(teamId)
      .populate("teamPlayers")
      .lean()

    return currentTeam || team
  }

  const [homeTeam, awayTeam] = await Promise.all([
    populateTeam(tableData.homeTeam),
    populateTeam(tableData.awayTeam),
  ])

  return {
    ...tableData,
    homeTeam,
    awayTeam,
  }
}

async function index(req, res) {
  try {
    const tables = await Table.find({})
      .populate([
        "match1",
        "match2",
        "match3",
        "homeTeamApproval",
        "awayTeamApproval",
      ])

    const populatedTables = await Promise.all(
      tables.map((table) => populateCurrentTeams(table))
    )

    res.json(populatedTables)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

async function findOne(req, res) {
  try {
    const table = await Table.findById(req.params.id)
      .populate([
        "match1",
        "match2",
        "match3",
      ])

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      })
    }

    const populatedTable = await populateCurrentTeams(table)

    res.json(populatedTable)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

async function create(req, res) {
  try {
    const newTable = await Table.create(req.body)

    const populatedTable = await Table.findById(newTable._id)
      .populate([
        "match1",
        "match2",
        "match3",
      ])

    const result = await populateCurrentTeams(populatedTable)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

async function deleteOne(req, res) {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id)

    if (!deletedTable) {
      return res.status(404).json({
        message: "Table not found",
      })
    }

    res.json(deletedTable)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

async function update(req, res) {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      "match1",
      "match2",
      "match3",
      "homeTeamApproval",
      "awayTeamApproval",
    ])

    if (!updatedTable) {
      return res.status(404).json({
        message: "Table not found",
      })
    }

    const result = await populateCurrentTeams(updatedTable)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

export {
  create,
  index,
  deleteOne as delete,
  update,
  findOne,
}
