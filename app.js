const express = require("express");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use("/documents", express.static("public/documents"));
app.use("/videos", express.static("public/videos"));
app.set("view engine", "ejs");

const routes = require("./routes");
app.use("/api/v1", routes);
app.get("/", (req, res) => res.render("image"));
app.get("/video", (req, res) => res.render("video"));
app.get("/document", (req, res) => res.render("document"));

// 500 error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: err.message,
    data: null,
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `are you lost? ${req.method} ${req.url} is not registered!`,
    data: null,
  });
});

module.exports = app;
