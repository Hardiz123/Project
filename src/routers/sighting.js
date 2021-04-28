const express = require("express");
const Sighting = require("../models/sighting");
const router = new express.Router();

router.post("/addsight", async (req, res) => {
  const sight = new Sighting({
    ...req.body,
  });
  try {
    await sight.save();
    res.status(201).send(sight);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/allsight", async (req, res) => {
  try {
    const sight = await Sighting.find({});
    if (!sight) {
      return res.status(404).send();
    }
    res.status(200).send(sight);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/modifysight/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["species", "datetime", "location"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates! " });
  }
  try {
    const sight = await Sighting.findOne({
      species: req.params.id,
    });
    if (!sight) {
      return res.status(404).send("No task found");
    }
    updates.forEach((update) => (sight[update] = req.body[update]));
    await sight.save();
    res.send(sight);
  } catch (e) {
    res.status(400).send("something went wrong");
  }
});
router.delete("/deletesight/:id", async (req, res) => {
  try {
    const sight = await Sighting.findOneAndDelete({
      species: req.params.id,
    });
    if (!sight) {
      res.status(404).send();
    }
    res.send(sight);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
