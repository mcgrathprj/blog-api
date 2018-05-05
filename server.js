
const express = require('express');
const router = express.Router();
const morgan = require('morgan');

const app = express();

const blogPostsRouter = require('./blogPostsRouter');

app.use(morgan('common'));
app.use(express.static('public'));

app.use('/blog-posts', blogPostsRouter);

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = {app, runServer, closeServer};