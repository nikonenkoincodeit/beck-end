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

const { validationData } = require("../helpers/validation");
const { showQueryResult } = require("../helpers/result");

router
  .route("/hamsters")
  .get(async (req, res) => {
    try {
      const data = await getHamsters();
      showQueryResult(!data, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .post(checkRequestParameters, async (req, res) => {
    try {
      const data = await addHamsters(req.body);
      res.send(JSON.stringify(data));
    } catch (error) {
      res.sendStatus(500);
    }
  });

function checkRequestParameters(req, res, next) {
  const b = req.body;
  if (b.name && b.age && b.imgName) {
    next();
  } else {
    res.sendStatus(404);
  }
}

router.route("/hamsters/random/").get(async (req, res) => {
  try {
    const data = await randomHamster();
    showQueryResult(!data.name, data, res);
  } catch (error) {
    res.sendStatus(500);
  }
});

router
  .route("/hamsters/:id")
  .get(async (req, res) => {
    try {
      const data = await getHamster(req.params.id);
      showQueryResult(!data.name, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await deleteHamster(req.params.id);
      showQueryResult(!data, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .put(validationData, async (req, res) => {
    try {
      const data = await updateHamster(req.params.id, req.body);
      showQueryResult(!data, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  });

module.exports = router;
