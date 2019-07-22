const db = require('../config/db.config.js');
const User = db.user;
const bcrypt = require('bcrypt');
const Beats = db.Beats;
const Followers = db.followers;
const jwt = require('jsonwebtoken');
const body = require('body-parser');
const jwtd = require ('jwt-decode')
//const saltRounds=10;
//var salt = bcrypt.genSaltSync(saltRounds);

jwtKey = 'secretk3y';

const generateJWT = (user) => {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
      id: user.id,
      email: user.email,
      exp: parseInt(expiry.getTime() / 1000)
    },
    config.jwtKey
  );
}

// Register 

exports.register = (req, res) => {
  const today = new Date()
  const userData = {
    name: req.body.name,
    email: req.body.email,
    hash: req.body.password,
    createdAt: today
  }
  console.log(userData);
  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.hash = hash
          User.create(userData)
            .then(user => {
              res.json({
                status: user.email + ' registered'
              })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({
          error: 'User already exists'
        })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
};
//Add Beats
exports.addBeats = (req, res) => {
  if (!req.headers['authorization']) {
    res.status(400).json({
      err: true,
      msg: 'No Authorization Header',
      data: {}
    })
  }
  let auth_id = req.headers['authorization'].split(' ')[1]
  if (!auth_id) {
    res.status(400).json({
      err: true,
      msg: 'No Token in Header',
      data: {}
    })
  }
  if(!jwt.verify(auth_id, jwtKey)){
    res.status(400).json({
      err: true,
      msg: '',
      data: {}
    })
  }
  try{
    Beats.create({
    beat: req.body.beat,
    uid: jwtd(req.headers['authorization'].split(' ')[1]).id
  }).then(beat => {
    // Send created beat to client
    res.send(beat);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
}
catch(e){
  res.status(500).send("Error -> " + e);
};
}
// FETCH all Beats
exports.allBeats = async (req, res) => {
  if (!req.headers['authorization']) {
    res.status(400).json({
      err: true,
      msg: 'No Authorization Header',
      data: {}
    })
  }

  let auth_id = req.headers['authorization'].split(' ')[1]
  if ( !auth_id || !jwt.verify(auth_id, jwtKey) ){
    res.status(400).json({
      err: true,
      msg: 'No Token in Header',
      data: {}
    })
  }
  try {
    let auth_sts = await jwt.verify(auth_id, jwtKey)
    console.log(auth_sts)
    Beats.findAll({
      where: {
        uid: auth_sts.id
      }
    }).then(beats => {
      // Send all Beats to Client
      res.send(beats);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  } catch (e) {
    res.status(500).send("Error -> " + e);
  }
}

// Find user by name
exports.findByName = (req, res) => {
  User.findAll({
    name: {
      $like: req.body.name
    }
  }).then(
    user => {
      res.send(user)
    }
  ).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};

//Login
exports.login = (req, res) => {
  User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.hash)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          }
          let token = jwt.sign(payload, jwtKey, {
            expiresIn: 1440
          })
          console.log(token)
          res.send(token)

        } else {
          res.json({
            error: 'User does not exist'
          })
        }
      } else {
        res.json({
          error: 'User does not exist'
        })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


//User Follow
exports.followUser = (req, res) => {
  Followers.findOne({
    where: {
      uid: req.body.uid,
      fid: req.body.fid
    }
  }).then(follower => {
    if (follower) {
      follows.create({
        uid: req.body.uid,
        follows_id: req.body.fid
      })
    } else {
      res.status(400).json({
        err: true,
        msg: 'Already Following!!!'
      })
    }
  })
};
//Unfollow Users
exports.unfollowUser = (req, res) => {
  const fusr = User.findById(req.params.iId)
  if (!fusr) {
    res.status(400).json({
      err: true,
      msg: 'Cannot Unfollow !!!'
    })
  } else {
    const id = req.params.userId;
    followUser.destroy({
      where: {
        u_id: id
      }
    }).then(() => {
      res.status(200).send('User has been unfollowed');
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  }
};