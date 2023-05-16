const router = require('express').Router()
const moment = require('moment')

const Category = require('../../models/category')
const Record = require('../../models/record')

// Create
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(catagories => {
      return res.render('new', { catagories })
    })
})

router.post('/new', (req, res) => {
  Category.find()
    .lean()
    .then(catagories => {
      const userId = req.user._id
      const { name, date, categoryId, amount } = req.body
      const errors = []

      catagories.forEach(item => {
        if (String(item._id) === categoryId) {
          item.selected = true
        } else {
          item.selected = false
        }
      })

      if (!name || !date || !categoryId || !amount) {
        errors.push({ message: '所有欄位都是必填！' })
      }
      if (errors.length) {
        return res.render('new', {
          errors, name, date, amount, catagories
        })
      }

      return Record.create({
        name, date, categoryId, amount, userId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// Update

// Delete

module.exports = router