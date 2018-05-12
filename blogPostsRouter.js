const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const {BlogPosts} = require('./models');

router.get('/posts', (req, res) => {
  blog-api
  .find();
  .then(posts => {
  res.json(BlogPosts.get());
  });
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.get('/posts/:id', (req, res) => {
  blog-api
  .findById(req.params.id);
  .then(posts => {
  res.json(BlogPosts.get());
  });
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});


router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title','content','author'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  // const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  // res.status(201).json(item);
blog-api
  .create({
  title: req.body.title,
  content: req.body.content,
  author: req.body.author
  });
  .then(blog-api => res.status(201).json(blog-api.serialize()))
  .catch(err=> {
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  });
});


router.delete('posts/:id', (req, res) => {
  blog-api
    .findByIdAndRemove(req.params.id)
    .then(blog-api => res.status(204).end())
    .catch(err => res.status(500).json{message: "Internal Server Error"})

});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'id', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const toUpdate = {};
  const updatableFields = ['title', 'content', 'author'];

  updatableFields.forEach (field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  blog-api
  .findByIdAndUpdate (req.params.id, {$set: toUpdate})
  .then(blog-api => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal Server Error'}))
});

module.exports = router;