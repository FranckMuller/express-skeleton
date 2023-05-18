const express = require("express");
const postRouter = express.Router();
const postsController = require("../../controllers/posts-controller");
const verifyJwt = require("../../middleware/verify-jwt");
const verifyRoles = require("../../middleware/verify-roles");
const ROLES_LIST = require("../../config/user-roles");

postRouter
  .route("/")
  .get(postsController.getPosts)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    postsController.createNewPost
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    postsController.updatePost
  )
  .delete(verifyRoles(ROLES_LIST.Admin), postsController.deletePost);
  
  postRouter.get('/:id', postsController.getPost)

module.exports = postRouter;
