const router = require('express').Router()
const moment = require('moment')

const Category = require('../../models/category')
const Record = require('../../models/record')

// Read all
router.get('/', (req, res) => {
  const userId = req.user._id

  Category.find()
    .lean()
    .then(catagories => {
      Record.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'desc' }) // asc
        .then(records => {
          let totalAmount = 0

          records.forEach(item => {
            totalAmount += item.amount
            item.date = moment(item.date).format('YYYY-MM-DD')
          })

          return res.render('index', {
            records, catagories, totalAmount
          })
        })
    })
    .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId

  if (!categoryId) {
    return res.redirect('/')
  }

  Category.find()
    .lean()
    .then(catagories => {
      catagories.forEach(item => {
        if (String(item._id) === categoryId) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
      Record.find({ userId, categoryId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'desc' }) // asc
        .then(records => {
          let totalAmount = 0
          records.forEach(item => {
            totalAmount += item.amount
            item.date = moment(item.date).format('YYYY-MM-DD')
          })

          return res.render('index', { records, catagories, totalAmount })
        })
    })
    .catch(err => console.log(err))
})

module.exports = router