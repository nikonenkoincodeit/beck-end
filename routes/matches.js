const express = require("express");
const router = express.Router();

const {
  addMatches,
  getMatches,
  getMatche,
  deleteMatches,
  getWinners,
  getLosers,
  matchWinners,
} = require("../service/matches.js");

router
  .route("/matches")
  .get(async (req, res) => {
    try {
      const data = await getMatches();
      res.send(JSON.stringify(data));
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      await addMatches(req.body);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });

router
  .route("/matches/:id")
  .get(async (req, res) => {
    try {
      const data = await getMatche(req.params.id);
      res.send(JSON.stringify(data));
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await deleteMatches(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });

router.route("/winners").get(async (req, res) => {
  try {
    const data = await getMatches();
    const result = await getWinners(data);
    const obj = {
      winners: result,
    };
    res.send(JSON.stringify(obj)).status(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route("/losers").get(async (req, res) => {
  try {
    const data = await getMatches();
    const result = await getLosers(data);
    const obj = {
      losers: result,
    };
    res.send(JSON.stringify(obj));
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route("/matchWinners/:id").get(async (req, res) => {
  try {
    const data = await matchWinners(req.params.id);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
