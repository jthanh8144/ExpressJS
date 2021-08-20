class newsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }
}

module.exports = new newsController;