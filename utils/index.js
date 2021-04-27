function randomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDatasetOfWinnersOrLosers(data, toggle, hamsters) {
  let map = new Map();
  for (item in data) {
    const key = data[item][toggle];
    if (!map.has(key)) map.set(key, 1);
    else map.set(key, map.get(key) + 1);
  }

  const keys = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((item) => item[0]);

  return hamsters.filter((hamster) => keys.includes(hamster.id));
}

function createArray(object) {
  let array = [];
  for (const key in object) {
    object[key].id = key;
    array.push(object[key]);
  }
  return array;
}

module.exports = {
  randomIntegerFromInterval,
  getDatasetOfWinnersOrLosers,
  createArray,
};
