const express = require("express");
const foodRoutes = require("./routes/FoodRoutes");
const userRoutes = require("./routes/userRoutzs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection secured!!!!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use("/foods", foodRoutes);
app.use("/users", userRoutes);

const port = 1234;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
