const statusCode = require("../../constants/statusCode");

exports.validateBody = (schema) => {
  return function (req, res, next) {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res
          .status(statusCode.ERROR)
          .json({ msg: error?.details?.[0].message, success: false });
      }

      next();
    } catch (err) {
      console.log("error is ", err);
      return res.status(500).json({ message: err.message, success: false });
    }
  };
};
