const router = require('express').Router()

// Read all
router.get('/', (req, res) => {
  res.send('read all')
})

module.exports = router