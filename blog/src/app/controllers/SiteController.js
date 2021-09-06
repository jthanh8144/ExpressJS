const { multipleMongooseToObject } = require('../../util/mongoose');

const Course = require('../models/Course');

class SiteController {
    // [GET] /
    home(req, res, next) {
        // res.render('home');

        // Call back
        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     }
        //     else {
        //         next(err);
        //     }
        // });

        // Promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
