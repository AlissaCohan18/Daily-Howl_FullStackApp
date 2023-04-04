const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

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

// Set up routes at /api/users/:userId/friend/:friendId
router
.route("/:userId/friend/:friendId")
 .post(addFriend)
 .delete(removeFriend)

  module.exports = router;