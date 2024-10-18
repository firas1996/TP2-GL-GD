const express = require("express");
const fs = require("fs");
const foodRoutes = require("./routes/FoodRoutes");
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

const port = 1234;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});

app.get("/msg", (req, res) => {
  res.send("Salem");
});

let foods = JSON.parse(fs.readFileSync("./foods.json", "utf-8"));

app.get("/foods", (req, res) => {
  res.status(200).json({
    message: "success!!!",
    results: foods.length,
    data: { foods },
  });
});

app.post("/foods", (req, res) => {
  const newFood = Object.assign(
    { id: foods[foods.length - 1].id + 1 },
    req.body
  );
  foods.push(newFood);
  fs.writeFile("./foods.json", JSON.stringify(foods), "utf-8", (err) => {
    res.status(201).json({
      message: "Food created",
      data: {
        newFood,
      },
    });
  });
});
