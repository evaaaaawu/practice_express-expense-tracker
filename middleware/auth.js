module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {  // passport.js 提供的函式
      return next()
    }
    res.redirect('/users/login')
  }
}