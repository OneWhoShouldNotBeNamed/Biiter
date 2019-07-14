const db = require('../config/db.config.js');
const User = db.user;
 const Beats= db.Beats;


// Register User
exports.register = (req, res) => {  
  // Save to MySQL database
  User.create({  
    name: req.body.name,
    hash:req.body.pass
  }).then(user => {    
  
  // Send created user to client
    res.send(user);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
//Add Beats
exports.addBeats = (req, res) => {  
    Beats.create({  
    beat:req.body.beat,
    uid:req.body.uid
  }).then(beat => {    
    // Send created beat to client
    res.send(beat);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};

// FETCH all Beats
exports.allBeats = (req, res) => {
  Beats.findAll().then(beats => {
    // Send all Beats to Client
    res.send(beats);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
}; 
// Find user by name
exports.findByName = (req, res) => {
  User.findAll({
    where: {
      name: req.body.name
        }
  }).then(
    user => {
      res.send(user)
    }
  ).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
 

