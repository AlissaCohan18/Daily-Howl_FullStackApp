const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFollower,
  removeFollower,
} = require("../../controllers/user-controller");
const { createUser} = require ('../../controllers/signing-controller')


// Set up routes at /api/users
router
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  
// Set up routes at /api/users/:id
  router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up routes at /api/users/:userId/follower/:followerId
router
.route("/:userId/follower/:followerId")
 .post(addFollower)
 .delete(removeFollower)

  module.exports = router;