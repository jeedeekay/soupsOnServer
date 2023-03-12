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

recipeRouter.route('/:recipeId/comments')
.get((req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .populate('comments.author')
    .then(recipe => {
        if (recipe) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(recipe.comments);
        } else {
            err = new Error(`Recipe ${req.params.recipeId} not found`);
            err.state = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    console.log(req.body);
    Recipe.findById(req.body.recipeId)
    .then(recipe => {
        if (recipe) {
            console.log(recipe);
            req.body.author = '64095ebb9bc4744ccc515d20';
            console.log('new comment', req.body);
            recipe.comments.push(req.body);
            console.log('updated recipe', recipe);
            recipe.save()
            .then(recipes => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                recipes.filter((recipe) => {
                    console.log(recipe.comments);
                });
                res.json(recipes);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Reipce ${req.body.recipeId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

module.exports = recipeRouter;