
function errorhandler(err, req, res, next){
    const status = err.status || 400 ;
    const message = err.message || "something went wrong";

    res.status(status).render('error', {
        title: 'Error',
        message: message
    });
}

module.exports = errorhandler;