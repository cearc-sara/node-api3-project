const express = require('express');

const Users = require("./userDb")
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(users => {
    res.status(201).json({ data: users })
  })
  .catch(err => {
    res.status(500).json({ error: "error adding the user" })
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json({ data: users})
  })
  .catch(error => {
    res.status(500).json({ error: "Error retrieving the users" })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(users => {
    if(users){
      res.status(200).json({ data: users })
    }else{
      res.status(404).json({ errorMessage: "User not found"})
    }
  })
  .catch(err => {
    res.status(500).json({ error: "error retrieving the users"})
  })
});

router.get('/:id/posts', validatePost, validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(count => {
    if(count > 0){
      res.status(200).json({ message: count })
    }else{
      res.status(404).json({ message: "the user could not be found" })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "error removing the user" })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(users => {
    res.status(200).json({ data: users })
  })
  .catch(err => {
    res.status(500).json({ error: "error updating the user" })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  if(req.params.id){
    req.user = req.params.id;
    next()
  }else if(req.params.id !== req.user){
    res.status(400).json({ message: "invalid user id" })
  }else{
    res.status(404).json({ message: "no user found with that id" })
  }
}

function validateUser(req, res, next) {
  if(req.body && req.body.name){
    next()
  }else if(req.body.name === " "){
    res.status(400).json({ message: "missing required name field" })
  }else{
    res.status(400).json({ message: "missing user data"})
  }
}

function validatePost(req, res, next) {
  if(req.body){
    next()
  }else{
    res.status(400).json({ message: "missing post data" })
  }
}

module.exports = router;
