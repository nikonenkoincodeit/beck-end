const express = require("express");
const router = express.Router();

const {
  addHamsters,
  getHamsters,
  getHamster,
  deleteHamster,
  randomHamster,
  updateHamster,
} = require("../service/hamsters.js");

const { validationData } = require("../middleware/validation");
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
      const data = await addHamsters(req.body);
      res.send(JSON.stringify(data));
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
      if (!data) res.sendStatus(404);
      else res.send(JSON.stringify(data));
    } catch (error) {
      res.sendStatus(404);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await deleteHamster(req.params.id);
      if (!data) res.sendStatus(404);
      else res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  })
  .put(validationData, async (req, res) => {
    try {
      const data = await updateHamster(req.params.id, req.body);
      if (!data) res.sendStatus(404);
      else res.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
