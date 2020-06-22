module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // TODO: promisfy
    jwt.verify(token, secretKey, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    next(decoded);
    });

}