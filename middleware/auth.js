module.exports = {
  ensureAuth: function (req, res, next) {
    // console.log(req.user)
    // console.log(req.session)
    // if person is autneticated, pass to the next step in the sequence, otherwise redirect to homepage
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
