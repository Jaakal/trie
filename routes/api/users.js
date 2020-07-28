const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

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