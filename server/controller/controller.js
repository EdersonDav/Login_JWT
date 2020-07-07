import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "../controller/validate";

const controller = {
  register: async (req, res) => {
    const { error } = validate.registerValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
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
    const { error } = validate.loginValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
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
    const token = jwt.sign(
      { _id: loginUser._id, name: loginUser.name, admin: loginUser.admin },
      process.env.TOKEN_JWT
    );
    res.header("auth-token", token);
    return res.status(200).send("Ok");
  },

  auth: (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send("Access denied");
    }
    try {
      const userVerify = jwt.verify(token, process.env.TOKEN_JWT);
      req.user = userVerify;
      next();
    } catch (error) {
      res.status(401).send("Access denied");
    }
    res.send("Token ok");
  },

  admin: async (req, res) => {
    if (req.user.admin) {
      res.send("Esse dado é de admin");
    } else {
      res.status(401).send("Not Admin: access denied");
    }
  },

  common: async (req, res) => {
    res.send("Você está logado");
  },
};

export default controller;
