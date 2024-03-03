import { Schedule } from "../models/schedule.js"

async function index(req, res) {
  try {
    const schedule = await Schedule.find({})
    res.json(schedule)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

function create(req, res) {
  req.body.owner = req.user.profile
  Schedule.create(req.body)
  .then(schedule => {
    Schedule.findById(schedule._id)
    .then(populatedSchedule => {
      res.json(populatedSchedule)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Schedule.findById(req.params.id)
  .then(schedule => {
    if (schedule.owner._id.equals(req.user.profile)) {
      Schedule.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedSchedule => {
        res.json(updatedSchedule)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}


function deleteOne(req, res) {
  console.log();
  Schedule.findById(req.params.id)
  .then(schedule => {
      Schedule.findByIdAndDelete(schedule._id)
      .then(deletedSchedule => {
        res.json(deletedSchedule)
      })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  index,
  create,
  update,
  deleteOne
}