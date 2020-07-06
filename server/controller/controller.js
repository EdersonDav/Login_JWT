import User from "../models/UserModel";

const controller = {
  register: async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const saveUser = await user.save();
      res.send(saveUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: (req, res) => {
    res.send("Register");
  },
};

export default controller;
