// add variables to require necessary dependencies
const express = require('express');
const bodyParser = require('body-parser');
const data = require("./data.json");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// adding static assets
app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

// set up middleware
app.set('view engine', 'pug');
app.use(express.json());

// set up "index" route
app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
});

// set up "about" route
app.get('/about', (req, res) => {
    res.render('about');
});

// dynamic "project" route
app.get('/project', (req, res) => {
    let id = req.query['id'];
    res.render('project', { project: data.projects[id] });
})

// handle not-found errors function
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err);
})
app.use((err, req, res, next) => {
    res.render('error', { error: err });
});

// start the server with port 3000
app.listen(3000, function () {
    console.log("server running on 3000");
})