function validationData(req, res, next) {
  if (req.body.wins) next();
  else res.sendStatus(400);
}

module.exports = { validationData };
