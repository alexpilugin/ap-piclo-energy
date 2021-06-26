const { Router } = require('express')
const router = Router()

//const appRoot = path.resolve(__dirname)
const buyers = require('../../assets/data/buyers.json')

/* GET records listing. */
router.get('/buyers', function (req, res) {
  console.log('/api/buyers')
  res.json(buyers)
})
module.exports = router