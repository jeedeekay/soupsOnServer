const express = require('express');
const Recipe = require('../models/recipe');
const authenticate = require('../authenticate');

const recipeRouter = express.Router();

recipeRouter.route('/')
.get((req, res, next) => {
    Recipe.find()
    .then(recipes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipes);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /recipes');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipes');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /recipes');
});

recipeRouter.route('/:recipeId')
.get((req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .then(recipe => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /recipes/${req.params.recipeId}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /recipes/${req.params.recipeId}`);
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /recipes/${req.params.recipeId}`);
});

module.exports = recipeRouter;