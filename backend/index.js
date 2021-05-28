const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./config/db.config");
require("./config/passport.config");

const app = express();

let corsConfig = {
  origin: "http://localhost:4200"
};

app.use(cors(corsConfig));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

require("./routes/user.route")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App running at " + PORT);
});
