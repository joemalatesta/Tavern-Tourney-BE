import { Table } from "../models/table.js";
import { setupSocketServer } from '../socket-setup.js'; // Import the setupSocketServer function



const { server, io } = setupSocketServer(); // Destructure server and io from the returned object


async function index(req, res) {
  try {
    const table = await Table.find({}).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    res.json(table);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function findOne(req, res) {
  try {
    const table = await Table.findById(req.params.id).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    res.json(table);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    const newTable = await Table.create(req.body);
    const populatedTable = await Table.findById(newTable._id).exec();
    res.json(populatedTable);

    // Emit socket.io event when a new table is created
    io.emit('tableChanged');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

function deleteOne(req, res) {
  Table.findById(req.params.id).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    .then((table) => {
      Table.findByIdAndDelete(table._id).then((deletedTable) => {
        res.json(deletedTable);
        
        // Emit socket.io event when a table is deleted
        io.emit('tableChanged');
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function update(req, res) {
  Table.findById(req.params.id).populate(["awayMatch1","awayMatch2","awayMatch3","homeMatch1","homeMatch2","homeMatch3", "homeTeamApproval", "awayTeamApproval"])
    .then((table) => {
      Table.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (updatedTable) => {
          res.json(updatedTable);
          
          // Emit socket.io event when a table is updated
          io.emit('tableChanged');
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

export { create, index, deleteOne as delete, update, findOne };
