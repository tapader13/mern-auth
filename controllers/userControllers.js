import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generatetkn from '../token/generateToken.js';

//route post/api/users/auth/public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generatetkn(res, user.id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

//route post/api/users/public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('user exists');
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generatetkn(res, user.id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

//route post/api/users/logout/public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: ' User logout' });
});

//route get/api/users/profile/private
const userProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

//route put/api/users/profile/private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updated = await user.save();
    res.status(200).json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});
export { authUser, registerUser, logoutUser, userProfile, updateProfile };
