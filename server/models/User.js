//import Schema
const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')


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
  password: {
    type: String,
    required: true
  },
  memes: [
    {
      type: Schema.Types.ObjectId,
      //ref property to tell User model which docs to search
      ref: "Meme",
    },
  ],
  followers: [
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


// static signup method
UserSchema.statics.signup = async function(email, username, password) {

  // validation
  if (!email || !username || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error(validator.details)
  // }

  const existsEmail = await this.findOne({ email })

  if (existsEmail) {
    throw Error('Email already in use')
  }

  const existsUsername = await this.findOne({ username })

  if (existsUsername) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, username, password: hash })

  return user
}



// static login method
UserSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// get total count of followers
UserSchema.virtual("followerCount").get(function () {
   return this.followers.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
