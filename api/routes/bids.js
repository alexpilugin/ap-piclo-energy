const { Router } = require('express')
const router = Router()

const bids = require('../../assets/data/bids.json')

/* GET records listing. */
router.get('/bids', function (req, res) {
  res.json(bids)
})
module.exports = router