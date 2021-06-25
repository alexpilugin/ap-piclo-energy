const { Router } = require('express')
const router = Router()
const competitions = require('../../assets/data/competitions.json')

/* GET records listing. */
router.get('/competitions', function (req, res) {
  res.json(competitions)
})
module.exports = router