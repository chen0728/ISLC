exports.authorize = function(req, res, next) {
    if (!req.session.account_id) {
        res.redirect('/');
    } else {
        next();
    }
};