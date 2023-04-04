//import Schema
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    //remove unnecessary white spaces at start/end of string
    trim: true,
  },
  email: {
    type: String,
    required: true,
      unique: true,
      match: /.+\@.+\..+/,
  },
  memes: [
    {
      type: Schema.Types.ObjectId,
      //ref property to tell User model which docs to search
      ref: "Meme",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
   return this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
