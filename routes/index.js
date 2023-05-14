const router = require('express').Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

// 最短的放最下面
router.use('/records', records)
router.use('/users', users)
router.use('/', home)

module.exports = router