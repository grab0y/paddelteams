module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Inicia sesión para ver esta pagina');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  };