module.exports = {
    index(req, res, next) {
        return res.status(200).res.render('index', { title: 'Home' });
    }
}