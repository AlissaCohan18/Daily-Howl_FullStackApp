require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(require("./routes"));

//connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  //listen for requests
  app.listen(PORT, () => console.log(`🌍 Connected to db & listening on Port: ${PORT}`));
});

//log mongo queries being executed
mongoose.set("debug", true);
