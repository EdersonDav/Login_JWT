import User from "../models/UserModel";
import bcrypt from "bcryptjs";

const controller = {
  register: async (req, res) => {
    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) {
      return res.status(400).send("Email already exists");
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    try {
      const saveUser = await user.save();
      res.send(saveUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    const loginUser = await User.findOne({ email: req.body.email });
    if (!loginUser) {
      return res.status(400).send("Email or Password incorrect");
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      loginUser.password
    );
    if (!validPassword) {
      return res.status(400).send("Email or Password incorrect");
    }
    return res.status(200).send("Ok");
  },
};

export default controller;
