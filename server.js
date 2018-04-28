
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create("Aggretsuko Is All Of Us And We Are All Aggretsuko","Some content about Aggretsuko", "Charles Pulliam-Moore", )
BlogPosts.create("Roomful of Rich, White NYC Parents Get Big Mad at Plan to Diversify Neighborhood's Schools", "Yikes. Just yikes.", "Anne Branigin")
BlogPosts.create("Tesla Driver Banned From Highway After Being Caught In the Passenger Seat", "Yikes again.", "Elizabeth Werth")

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});
