const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// const { once } = require('events');
// const { createReadStream } = require('fs');
// const { createInterface } = require('readline');
// const path = require('path')

// const processLineByLine = async () => {
//   try {
//     const rl = createInterface({
//       input: createReadStream(path.join(__dirname, '/../../data/names-1.txt')),
//       crlfDelay: Infinity
//     });

//     rl.on('line', async (name) => {
//       // console.log(line)

//       try {   
//         let user = await User.findOne({ name })
      
//         if (user) {
//           console.log('User already exists!')
//         } else {
//           user = new User({ name })

//           await user.save()
//         }
//       } catch (err) {
//         throw err
//       }

//     });

//     await once(rl, 'close');

//     console.log('File processed.');
//   } catch (err) {
//     throw err
//   }
// };

// // @route   GET api/users/seed
// // @desc    Seed the database
// // @access  Public
// router.get('/seed', async (req, res) => {
//   try {
//       // fs.readFile(path.join(__dirname, '/../../data/names-1.txt'), (err, con) => {
//       //   if (err) throw err
//       //   res.writeHead(200, { 'Content-Type': 'text/html' })
//       //   res.end(con)
//       // })

//     // fs.readFile('../../data/names-1.txt', (err, data) => {
//     //   if (err) throw err
//     //   return res.json({ data })
//     // })
//     await processLineByLine()
//     res.json('Database seeded!') 
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server error')
//   }
// })

// @route   GET api/users
// @desc    Get all the users from the database
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json({ users })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/users
// @desc    Create a new user to the database
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  const { name } = req.body

  try {
    let user = await User.findOne({ name })
    
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    user = new User({ name })

    await user.save()

    res.send('User registered')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router