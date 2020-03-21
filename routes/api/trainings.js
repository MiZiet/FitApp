const express = require("express");
const router = express.Router();
const config = require("config");

const { check, validationResult } = require("express-validator");
const JWTauth = require("../../middleware/JWTauth");

const Training = require("../../models/Training");

// @route    POST api/trainings
// @desc     Create a training
// @access   Private

router.post(
  "/",
  [
    JWTauth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newTraining = new Training({
        user: req.user.id,
        name: req.body.name
      });
      await newTraining.save();
      res.json({ msg: "Training added" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/trainings/:id
// @desc     Delete training
// @access   Private
router.delete("/:id", JWTauth, async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    await training.remove();
    res.json({ msg: "Training removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/trainings/user/
// @desc     Get trainings by UserID
// @access   Private

router.get("/user", JWTauth, async (req, res) => {
  try {
    const trainingList = await Training.find({
      user: req.user.id
    })
      .select("name date")
      .sort("-date");
    res.json(trainingList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/trainings/:id
// @desc     Get single training data
// @access   Private
router.get("/:id", JWTauth, async (req, res) => {
  try {
    const trainingData = await Training.findById(req.params.id);
    res.json(trainingData);
  } catch (err) {}
});

// @route    POST api/trainings/update/:id
// @desc     Update training data
// @access   Private

router.post("/update/:id", JWTauth, async (req, res) => {
  const filter = { _id: req.params.id };
  const update = req.body;
  try {
    const training = await Training.findByIdAndUpdate(filter, update, {
      new: true,
      upsert: true
    });
    res.json(training);
  } catch (err) {}
});

module.exports = router;
