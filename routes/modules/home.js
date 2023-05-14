const router = require('express').Router()

// Read all
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router