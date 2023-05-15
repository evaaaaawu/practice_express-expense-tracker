if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('../seedsData/category.json')

db.once('open', async () => {
  try {
    await Category.create(categoryList)
    console.log('categorySeeder done!')
    process.exit()

  } catch (err) {
    console.log(err)
  }
})