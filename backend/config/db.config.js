const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/usermgmt", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Database!!");
  })
  .catch((err) => {
    console.log(`Error connecting database ${err}`);
  });
