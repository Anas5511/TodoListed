const { Router } = require("express");
const authRouter = Router();
const authController = require("../controller/authController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

authRouter.get(
  "/get-users",
  authentication.protect,
  authorization.allow("admin"),
  authController.getAllUsers
);

authRouter.delete(
  "/get-users/:userId" , 
  authentication.protect,
  authorization.allow("admin"),
  authController.deleteUser
)


authRouter.get("/sign-up", (req, res) => {
  res.render("signup");
});

authRouter.get("/login" , (req , res) => {
  res.render("login")
})

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/login", authController.login);

module.exports = authRouter;
