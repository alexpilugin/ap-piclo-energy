const { Router } = require('express')
const router = Router()
const sellers = require('../../assets/data/sellers.json')

/* GET records listing. */
router.get('/sellers', function (req, res) {
  console.log('/api/sellers')
  res.json(sellers)
})
module.exports = router