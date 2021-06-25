export default function (req, res, next) {
  // Well, here comes nothing
  next()
}

/*
const express = require('express')
const app = express()

// Require API routes
const test = require('./routes/test')
const bids = require('./routes/bids')
const buyers = require('./routes/buyers')
const competitions = require('./routes/competitions')
const sellers = require('./routes/sellers')

// Import API Routes
app.use(test)
app.use(bids)
app.use(buyers)
app.use(competitions)
app.use(sellers)

app.use(express.json())

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

*/