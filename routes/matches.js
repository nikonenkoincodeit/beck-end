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

const { showQueryResult, showArrayOfResults } = require("../helpers/result");

router
  .route("/matches")
  .get(async (req, res) => {
    try {
      const data = await getMatches();
      showQueryResult(!data, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .post(checkRequestParameters, async (req, res) => {
    try {
      const data = await addMatches(req.body);
      res.send(JSON.stringify(data));
    } catch (error) {
      res.sendStatus(500);
    }
  });

function checkRequestParameters(req, res, next) {
  const b = req.body;
  if (b.winnerId && b.loserId) {
    next();
  } else {
    res.sendStatus(404);
  }
}

router
  .route("/matches/:id")
  .get(async (req, res) => {
    try {
      const data = await getMatche(req.params.id);
      showQueryResult(!data.winnerId, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await deleteMatches(req.params.id);
      showQueryResult(!data, data, res);
    } catch (error) {
      res.sendStatus(500);
    }
  });

router.route("/winners").get(async (req, res) => {
  try {
    showArrayOfResults(getWinners, res);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route("/losers").get(async (req, res) => {
  try {
    showArrayOfResults(getLosers, res);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route("/matchWinners/:id").get(async (req, res) => {
  try {
    const data = await matchWinners(req.params.id);
    showQueryResult(!data.length, data, res);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
