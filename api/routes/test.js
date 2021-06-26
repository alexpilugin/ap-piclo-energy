const { Router } = require('express')

const router = Router()

// Test route
router.use('/test', (req, res) => {
  console.log('/api/test')
  res.end('Created by Alex Pilugins.')
})

module.exports = router
