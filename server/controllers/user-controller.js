const { User } = require("../models");

const userController = {
  //get all users (GET /api/users)
  getAllUsers(req, res) {
    User.find({})
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Get a user by ID (GET /api/users/:id)
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbData) => {
        // If no User is found, send 404
        if (!dbData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create User   (POST /api/users)
  createUser({ body }, res) {
    User.create(body)
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(400).json(err));
  },

  //Update a user by ID (PUT /api/users/:id)
  updateUser({ params, body }, res) {
    //"runValidators:true" on PUT to ensure validation is ran on updates
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //Delete a user by ID (DELETE /api/users/:id)
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //Add new follower to user's follower list (POST /api/users/:userId/follower/:followerId)
  addFollower({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { followers: params.followerId } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No Users found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  //Remove a follower from a user's follower list (DELETE /api/users/:userId/follower/:followerId)
  removeFollower({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { followers: params.followerId } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No Users found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
