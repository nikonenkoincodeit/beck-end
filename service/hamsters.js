const firebase = require("./index");
const { randomIntegerFromInterval, createArray } = require("../utils");

let hamstersRef = firebase.database().ref("hamsters/");

function addHamsters(data) {
  try {
    return hamstersRef.push(data).then((item) => {
      const obj = { ...data, id: item.key };
      return obj;
    });
  } catch (error) {
    return error;
  }
}

function getHamsters() {
  return new Promise((resolve, reject) => {
    hamstersRef.on(
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

function getHamster(id) {
  const hamsterRef = hamstersRef.child(id);
  return new Promise((resolve, reject) => {
    hamsterRef.on(
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

async function deleteHamster(id) {
  try {
    const data = await getHamster(id);
    if (!data.name) return;
    hamstersRef.child(id).on("value", function (data) {
      data.ref.remove();
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function randomHamster() {
  try {
    const data = await getHamsters();
    const keys = Object.keys(data);
    const index = randomIntegerFromInterval(0, keys.length - 1);
    return data[keys[index]];
  } catch (error) {
    console.log(error);
  }
}
async function updateHamster(id, data) {
  try {
    const items = await getHamsters();
    const array = items.filter((item) => item.id === id);
    if (array.length === 0) return;

    const dataRef = hamstersRef.child(id);
    return dataRef
      .update(data)
      .then((date) => {
        return { ...array[0], ...data };
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
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
