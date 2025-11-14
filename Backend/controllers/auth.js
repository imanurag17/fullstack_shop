const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

exports.postSignup = ((req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  //User.find

  bcrypt.hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPw
      })
      return user.save()
    })
    .then(result => {
      res.status(201).json({ message: 'User Created', userId: result._id })
    })
    .catch(error => console.log(error))
})

exports.login = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email is not found')
        error.statusCode = 401;
        throw error
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then(doMatch => {
      if (!doMatch) {
        const error = new Error('Incorrect Password')
        error.statusCode = 401;
        throw error
      }
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      'secret_key',
      {expiresIn: '1h'}
    )
      res.status(200).json({ token: token, userId: loadedUser._id })
    })
    .catch(error => {
      console.error(error);
      const status = error.statusCode || 500;
      const message = error.message || 'Something went wrong.';
      res.status(status).json({ message });
    });
}