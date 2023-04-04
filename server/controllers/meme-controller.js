const { Meme, User } = require("../models");

const memeController = {
  //get all memes (GET /api/memes)
  getAllMemes(req, res) {
    Meme.find({})
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Get a single meme by ID (GET /api/memes/:ID)
  getSingleMeme({ params }, res) {
    Meme.findOne({ _id: params.memeId })
      .then((dbData) => {
        // If no Thought is found, send 404
        if (!dbData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create Meme   (POST /api/thoughts)
  createMeme({ body, params }, res) {
    Meme.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { memes: _id } },
          //receive back the User info with the updated array/new thought
          { new: true }
        );
      })
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(400).json(err));
  },

  //Update a meme by its ID (PUT /api/memes/:ID)
  updateMeme({ params, body }, res) {
    Meme.findOneAndUpdate({ _id: params.memeId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        // If no Meme is found, send 404
        if (!dbData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Delete a meme by its ID (DELETE /api/memes/:ID)
  deleteMeme({ params }, res) {
    Meme.findOneAndDelete({ _id: params.memeId })
      .then((deletedMeme) => {
        if (!deletedMeme) {
          return res.status(404).json({ message: "No meme with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { memes: params.memeId } },
          { new: true }
        );
      })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  //Create a like to a Meme, stored in that meme's like array  (POST /api/memes/:memeId/like)
  addLike({ params, body }, res) {
    Meme.findOneAndUpdate(
      { _id: params.memetId },
      { $push: { likes: body } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No Memes found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  //Remove a reaction by its ID    (DELETE /api/thoughts/:thoughtId/:reactionId)
  removeLike({ params }, res) {
    Meme.findOneAndUpdate(
      { _id: params.memeId },
      { $pull: { likes: { likeId: params.likeId } } },
      { new: true }
    )
      .then((dbData) => res.json(dbData))
      .catch((err) => res.json(err));
  },

  //Create a dislike to a Meme, stored in that meme's dislike array  (POST /api/memes/:memeId/dislike)
  addDislike({ params, body }, res) {
    Meme.findOneAndUpdate(
      { _id: params.memetId },
      { $push: { dislikes: body } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No Memes found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  //Remove a reaction by its ID    (DELETE /api/thoughts/:thoughtId/:reactionId)
  removeDislike({ params }, res) {
    Meme.findOneAndUpdate(
      { _id: params.memeId },
      { $pull: { dislikes: { dislikeId: params.dislikeId } } },
      { new: true }
    )
      .then((dbData) => res.json(dbData))
      .catch((err) => res.json(err));
  },
};

module.exports = memeController;
