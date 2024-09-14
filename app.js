require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const TaskRouter = require("./router/mainRouter");
const AuthRouter = require("./router/authRouter")
const connectionDB = require("./config/db");
const GlobalHandleErrors = require("./middleware/ErrorHandling");
const checkDeadlines = require("./utils/checkDeadLine")

// Set EJS as the view engine
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure this path is correct

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use(cookieParser());


// Routes
app.use("/api/v1/projects", TaskRouter);
app.use("/api/v1/auth" , AuthRouter);

// Error handling middleware
app.use(GlobalHandleErrors);

// Database connection
connectionDB();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
