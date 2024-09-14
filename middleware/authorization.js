exports.allow = (...roles) => {
  return  (req, res, next) => {
    const condition =  roles.includes(req.user.role);
    if (!condition) {
      // Optional chaining for safety
      return res.status(401).send({
        status: "fail",
        message: "You are not allowed to access this route", // Fixed typo
      });
    }

    next(); // Proceed to the next middleware/route handler if allowed
  };
};
