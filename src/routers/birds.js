const express = require("express");
const Bird = require("../models/birds");
const router = new express.Router();

router.post("/addbird", async (req, res) => {
  const bird = new Bird({
    ...req.body,
  });
  try {
    await bird.save();
    res.status(201).render('index');
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/allbirds", async (req, res) => {
  try {
    const birds = await Bird.find({});
    if (!birds) {
      return res.status(404).send();
    }
    res.status(200).send(birds);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/modifybird/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "size", "color", "weight"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates! " });
  }
  try {
    const bird = await Bird.findOne({
      name: req.params.id,
    });
    if (!bird) {
      return res.status(404).send("No task found");
    }
    updates.forEach((update) => (bird[update] = req.body[update]));
    await bird.save();
    res.send(bird);
  } catch (e) {
    res.status(400).send("something went wrong");
  }
  
});
router.delete("/deletebird/:id", async (req, res) => {
  try {
    const bird = await Bird.findOneAndDelete({
        name: req.params.id
    });
    if (!bird) {
      res.status(404).send();
    }
    res.send(bird);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
