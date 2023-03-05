const express = require('express');
const Comment = require('../models/comment');
const authenticate = require('../authenticate');

const commentRouter = express.Router();

commentRouter.route('/')
.get((req, res, next) => {
    Comment.findById(req.params.recipeId)
    .populate('comments.author')
    .then(comments => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /comments`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /comments`);
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /comments`);
});

module.exports = commentRouter;