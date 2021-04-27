const { getDatasetOfWinnersOrLosers, createArray } = require("../utils");
const firebase = require("./index");

const matchesRef = firebase.database().ref("matches/");

function addMatches(data) {
  try {
    return matchesRef.push(data).then((item) => {
      const obj = { ...data, id: item.key };
      return obj;
    });
  } catch (error) {
    return error;
  }
}

function getMatches() {
  return new Promise((resolve, reject) => {
    matchesRef.on(
      "value",
      (snapshot) => {
        resolve(createArray(snapshot.val()));
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
        const data = snapshot.val();
        const obj = { id, ...data };
        resolve(obj);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

async function deleteMatches(id) {
  try {
    const data = await getMatche(id);
    if (!data.winnerId) return;
    matchesRef.child(id).on("value", function (data) {
      data.ref.remove();
    });
    return data;
  } catch (error) {
    return error;
  }
}

async function getWinners(data, hamsters) {
  try {
    const id = await getDatasetOfWinnersOrLosers(data, "winnerId", hamsters);
    return id;
  } catch (error) {
    return error;
  }
}

async function getLosers(data, hamsters) {
  try {
    const id = await getDatasetOfWinnersOrLosers(data, "loserId", hamsters);
    return id;
  } catch (error) {
    return error;
  }
}

async function matchWinners(id) {
  const data = await getMatches();
  let array = [];
  for (item in data) {
    if (data[item].winnerId === id) array.push(data[item]);
  }

  return !!array.length ? array : [];
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
