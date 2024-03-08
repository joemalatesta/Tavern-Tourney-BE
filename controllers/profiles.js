import { Profile } from '../models/profile.js'


async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function findOne(req, res) {
  console.log(req.params);
  try {
    const profile = await Profile.findById(req.params.id)
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { index, findOne}
