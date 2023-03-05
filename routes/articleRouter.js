const express = require('express');
const authenticate = require('../authenticate');
const Article = require('../models/article');

const articleRouter = express.Router();

articleRouter.route('/')
.get((req, res, next) => {
    Article.find()
    .then(articles => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(articles);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /articles');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /articles');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /articles');
});

articleRouter.route('/:articleId')
.get((req, res, next) => {
    Article.findById(req.params.articleId)
    .then(article => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /articles/${req.params.articleId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /articles/${req.params.articleId}`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /articles/${req.params.articleId}`);
});

module.exports = articleRouter;