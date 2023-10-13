import { Player } from "../models/player"

async function index(req, res) {
  try {
    const profiles = await Player.find({})
    res.json(players)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}