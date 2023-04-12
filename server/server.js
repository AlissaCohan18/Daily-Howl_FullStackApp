require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
