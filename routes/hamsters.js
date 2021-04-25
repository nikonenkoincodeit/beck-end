const express = require("express");
const router = express.Router();

const {
  addHamsters,
  getHamsters,
  getHamster,
  deleteHamster,
  randomHamster,
  updateHamster,
} = require("../servise/hamsters.js");

router
  .route("/hamsters")
  .get(async (req, res) => {
    try {
      const data = await getHamsters();
      res.send(JSON.stringify(data));
    } catch (error) {
      res.sendStatus(404);
    }
  })
  .post(async (req, res) => {
    try {
      await addHamsters(req.body);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  });

router.route("/hamsters/random/").get(async (req, res) => {
  try {
    const data = await randomHamster();
    res.send(JSON.stringify(data));
  } catch (error) {
    res.sendStatus(404);
  }
});

router
  .route("/hamsters/:id")
  .get(async (req, res) => {
    try {
      const data = await getHamster(req.params.id);
      res.send(JSON.stringify(data)).status(200);
    } catch (error) {
      res.sendStatus(404);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await deleteHamster(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  })
  .put(async (req, res) => {
    try {
      await updateHamster(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  });

module.exports = router;
