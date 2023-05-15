if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')

const db = require('../../config/mongoose')

const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const recordList = require('../seedsData/record.json')

// 種子使用者
const userList = require('../seedsData/user.json')
const users = [] // 廣志, 美冴
const user1RecordsIndex = [0, 1, 2]
const user2RecordsIndex = [3, 4]

db.once('open', async () => {
  try {
    // 新增使用者
    await Promise.all(
      userList.map(async (seedUser) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(seedUser.password, salt)
        const user = await User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
        users.push(user)
      })
    )
    
    // 拿到所有的 category 資料
    const categoryList = await Category.find().lean()

    // 新增紀錄
    await Promise.all(
      recordList.map(async (seedRecord, index) => {
        const { name, date, amount, category } = seedRecord
        const referenceCategory = categoryList.find(data => data.name === category)
        seedRecord.categoryId = referenceCategory._id

        if (user1RecordsIndex.includes(index)) {
          seedRecord.userId = users[0]._id
        }
        if (user2RecordsIndex.includes(index)) {
          seedRecord.userId = users[1]._id
        }

        await Record.create({
          name,
          date,
          amount,
          userId: seedRecord.userId,
          categoryId: seedRecord.categoryId,
        })
      })
    )

    console.log('recordSeeder done!')
    process.exit()

  } catch (err) {
    console.log(err)
  }
})