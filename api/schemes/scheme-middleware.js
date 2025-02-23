/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

const db = require('./scheme-model');

const checkSchemeId = (req, res, next) => {
  const scheme_id = req.params.scheme_id;

  db.findById(scheme_id)
  .then(scheme => {
    if (scheme) {
      next()
    } else {
      return res.status(404).json({message: `scheme with ${scheme_id} not found`})
    }
  })
  .catch(error => {
    next(error)
  })
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

  const {scheme_name} = req.body;

  if (!scheme_name || scheme_name === "" || typeof scheme_name !== 'string') {
    res.status(400).json({message: 'invalid scheme_name'})
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {instructions, step_number} = req.body;

  if (!instructions || instructions === "" || typeof instructions !== 'string' || typeof step_number !== 'number' || step_number < 1 ) {
    return res.status(400).json({message: 'invalid step'})
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
