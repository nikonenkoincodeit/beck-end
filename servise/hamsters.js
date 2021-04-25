const firebase = require("./index");
const { randomIntegerFromInterval } = require("../utils");

const hamstersRef = firebase.database().ref("hamsters/");

function addHamsters(data) {
  try {
    hamstersRef.push(data);
  } catch (error) {
    return error;
  }
}

function getHamsters() {
  return new Promise((resolve, reject) => {
    hamstersRef.on(
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

function getHamster(id) {
  const hamsterRef = hamstersRef.child(id);
  return new Promise((resolve, reject) => {
    hamsterRef.on(
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

function deleteHamster(id) {
  try {
    hamstersRef.child(id).on("value", function (data) {
      data.ref.remove();
    });
  } catch (error) {
    return error;
  }
}

async function randomHamster() {
  try {
    const data = await getHamsters();
    const keys = Object.keys(data);
    const index = randomIntegerFromInterval(0, keys.length - 1);
    return data[keys[index]];
  } catch (error) {
    return error;
  }
}
async function updateHamster(id) {
  try {
    console.log("put 111", id); //wins: 10, games
    let array = [];
    array[0] = await hamstersRef.child(id).child("games");
    array[1] = await hamstersRef.child(id).child("wins");
    array.forEach((item) => {
      item.transaction(function (current) {
        return Number(current) + 1;
      });
    });
  } catch (error) {
    return error;
  }
}

module.exports = {
  addHamsters,
  getHamsters,
  getHamster,
  deleteHamster,
  randomHamster,
  updateHamster,
};
