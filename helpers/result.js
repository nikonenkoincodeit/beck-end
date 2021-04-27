const { getMatches } = require("../service/matches.js");
const { getHamsters } = require("../service/hamsters.js");

function showQueryResult(toggle, data, res) {
  if (toggle) res.sendStatus(404);
  else res.send(JSON.stringify(data));
}

async function showArrayOfResults(callback, res) {
  const hamsters = await getHamsters();
  const data = await getMatches();
  if (!hamsters.length || !data.length) return res.sendStatus(404);
  const result = await callback(data, hamsters);
  res.send(JSON.stringify(result));
}

module.exports = { showQueryResult, showArrayOfResults };
