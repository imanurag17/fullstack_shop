const User = require('../models/users')

exports.postSignup = ((req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  const user = new User({
    name: name,
    email: email,
    password: password
  })
  user.save()
    .then(result => {
      res.status(201).json({ message: 'User Created', userId: result._id })
    })
    .catch(error => console.log(error))
})