const express = require('express');

const {verifyToken} = require('../middlewares/verifyToken');

const {getAllPost, createOnePost, updateOnePost, deleteOnePost} = require('../controllers/postController.js');

const Router = express.Router();

Router.route('/').get(getAllPost).post(verifyToken,createOnePost);

Router.route('/:postId').put(verifyToken,updateOnePost).delete(verifyToken,deleteOnePost);

module.exports = Router;    