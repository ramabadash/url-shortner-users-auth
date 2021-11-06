
function errorHandlerMiddleware (err, req, res, next) {
    if (err.status === 404) { //page not found error
        return res.status(301).header("Location", "/404/notfound").end();
    }
    if(!err.status) { //other error
        return res.status(500).send({"error": "internal server error"});
    }
     return res.status(err.status).send({"error": err.messege}) ; 
}

module.exports = {errorHandlerMiddleware}