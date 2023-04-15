//import Schema
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const LikeSchema = new Schema(
  {
    //set custom id to avoid confusion with parent meme_id
    likeId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    likeBody: {
      type: Boolean,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


const MemeSchema = new Schema({
  memeText: {
    type: String,
    required: true,
    maxLength: 100,
  },
  memeUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
   get: (createdAtVal) => dateFormat(createdAtVal),
  },
  //the username that created this meme
  username: {
    type: String,
    required: true,
  },
 // associate Likes with Memes
 likes: [LikeSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}
);

MemeSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});


// create the Meme model using the MemeSchema
const Meme = model("Meme", MemeSchema);

// export the User model
module.exports = Meme;
