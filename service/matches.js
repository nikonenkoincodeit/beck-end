const { getDatasetOfWinnersOrLosers } = require("../utils");
const firebase = require("./index");

const matchesRef = firebase.database().ref("matches/");

function addMatches(data) {
  try {
    matchesRef.push(data);
  } catch (error) {
    return error;
  }
}

function getMatches() {
  return new Promise((resolve, reject) => {
    matchesRef.on(
      "value",
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function getMatche(id) {
  const matcherRef = matchesRef.child(id);
  return new Promise((resolve, reject) => {
    matcherRef.on(
      "value",
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deleteMatches(id) {
  try {
    matchesRef.child(id).on("value", function (data) {
      data.ref.remove();
    });
  } catch (error) {
    return error;
  }
}

async function getWinners(data) {
  try {
    const id = await getDatasetOfWinnersOrLosers(data, "winnerId");
    return id;
  } catch (error) {
    return error;
  }
}

async function getLosers(data) {
  try {
    const id = await getDatasetOfWinnersOrLosers(data, "loserId");
    return id;
  } catch (error) {
    return error;
  }
}

async function matchWinners(id) {
  const data = await getMatches();
  for (item in data) {
    if (data[item].winnerId !== id) delete data[item];
  }
  return data;
}

module.exports = {
  addMatches,
  getMatches,
  getMatche,
  deleteMatches,
  getWinners,
  getLosers,
  matchWinners,
};
