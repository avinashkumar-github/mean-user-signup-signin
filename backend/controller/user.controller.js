const passport = require("passport");
const User = require("./../model/user.model");
const _ = require("lodash");

exports.userLists = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

exports.create = (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user
    .save()
    .then((data) => {
      res.send({ message: "User added ", data: data });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

//async await format

exports.getUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { $set: user },
      { new: true }
    );
    res.send(data);
  } catch (e) {
    res.send({ message: err.message });
  }
};

//callback format

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send({ message: "User deleted for ID " + req.params.id });
    } else {
      res.send({ message: err.message });
    }
  });
};

exports.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).json(err);
    } else if (user) {
      return res.status(200).json({ token: user.generateJwt() });
    } else {
      return res.status(404).json(info);
    }
  })(req, res);
};

exports.userProfile = (req, res, next) => {
  User.findById(req._id)
    .then((data) => {
      res
        .status(200)
        .json({ status: true, user: _.pick(data, ["name", "email"]) });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
