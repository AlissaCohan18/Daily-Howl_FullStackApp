const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

//MongoDB will find and connect to the database if exists, otherwise create the database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social_network",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
