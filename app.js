const express = require("express");
const morgan = require("morgan");
const { environment } = require('./config');
const indexRouter = require(`./routes/index`);
const tweetsRouter = require(`./routes/tweets`);
const app = express();
const jsonify = express.json();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.use(morgan("dev"));
app.use(jsonify);
app.use(`/`, indexRouter); //Potentially add routes folder
app.use(`/tweets`, tweetsRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});


module.exports = app;
// module.exports = asyncHandler;
