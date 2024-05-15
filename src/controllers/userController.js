const UserModel = require("../models/userModel");
const statusCode = require("../constants/statusCode.js");
const bcrypt = require("bcrypt");

JWT_SECRET = process.env.JWT_SECRET;
JWT_EXPIRE = process.env.JWT_EXPIRE;

JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE;

/* Convert Plain Text password to Hash */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  pass = await bcrypt.hash(password, salt);

  return pass;
};

const matchPassword = async (plainPass, hashPass) => {
  return await bcrypt.compare(plainPass, hashPass);
};

const getSignedJwtToken = (user) => {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};

const getSignedJwtRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
  });

  return refreshToken;
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await UserModel.findOne({ where: { email } });

    if (emailExist) {
      return res
        .status(statusCode.DUPLICATE)
        .json({ msg: "email already exists", success: false });
    }
    req.body.password = hashPassword(password);

    const data = await UserModel.create(req.body);

    return res.status(statusCode.CREATED).json({ data, success: true });
  } catch (err) {
    console.log("Error is ", err);
    return res
      .status(statusCode.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

exports.signIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    const existUser = await UserModel.findOne({
      where: { email: email.toLowerCase() },
    });

    // if (!existUser) {
    //   return res
    //     .status(statusCode.UNAUTHORIZED)
    //     .json({ msg: "Invalid Credential", success: false });
    // }

    const match = await matchPassword(password, existUser?.password);
    if (!match || existUser) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json({ msg: "Email or password incorrect", success: false });
    }

    const token = getSignedJwtToken(existUser);
    const refreshToken = getSignedJwtRefreshToken(existUser);

    return res.status(201).json({
      msg: "Account Created Successful",
      data: existUser,
      token,
      refreshToken,
      success: true,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};
