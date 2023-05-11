const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();
const Menu = require("../models/menuModel");

router.route("/post_car").post(jsonParser, async (req, res) => {
  const newData = await Menu.create({
    name: req.body.name,
    owner: req.body.owner,
    color: req.body.color,
    price: req.body.price,
  });

  res.status(200).json({
    status: "success",
    data: newData,
  });
});

router.route("/get_car").get(async (req, res) => {
  const allCar = await Menu.aggregate([{
    $sort : {price: -1}
  }])

  res.status(200).json({
    status: "success",
    length: allCar.length,
    cars: allCar,
  });
});

router.route("/delete_car/:name").delete(async (req, res) => {
  console.log(req.params);
  console.log("ho");
  const doc = await Menu.findOneAndDelete({ name: req.params.name });

  if (doc === null) {
    res.status(200).json({
      status: "Data does not exist",
    });
  } else {
    res.status(200).json({
      status: "success",
      deleteData: doc,
    });
  }
});

router.route('/patch_report').patch();

module.exports = router;
