const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');
const mongoose = require('mongoose');

const userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
  User.find()
  .then(users => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  })
  .catch(err => next(err));
});

userRouter.route('/:userId')
.get((req, res, next) => {
  console.log(req.body);
  User.find()
  .then(user => {
    console.log(user);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  })
})
.post((req, res, next) => {
  console.log('post req',req.body);
  User.find()
  .then(user => {
    user.forEach((u) => {
      if (u.username === req.body.username) {
        console.log('user match', u);
        console.log(req.body.addFav);
        const newFav = {
          _id: mongoose.Types.ObjectId(req.body.addFav)
        };
        console.log('new fav', newFav);
        if (!u.favoriteRecipes.includes((rec) => {
          rec._id === newFav._id
        })) {
          u.favoriteRecipes.push(newFav);
          u.save();
          console.log('pushed');
        }
        console.log(u.favoriteRecipes);
      }
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  })
})

userRouter.post('/signup', cors.corsWithOptions, (req, res) => {
  User.register(
    new User({ username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save(err => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        })
        
      }
    }
  );
});

userRouter.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
})

userRouter.get('/logout', cors.corsWithOptions, (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 401;
    return next(err);
  }
});

module.exports = userRouter;