const express = require("express")
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")
const port = 3000;

app.use(express.json());
app.use("/items", itemsRoutes);


app.use(function (req, res) {
  return new ExpressError("Not Found", 404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });