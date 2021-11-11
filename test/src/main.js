const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const path = require('path');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser')
app.use(cookieParser('hanaidol'));

// static file
app.use(express.static(path.join(__dirname, 'public')));

//
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        // helpers: require('./helpers/handlebars')
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get("/", (req, res, next) => {
    res.render('form');
});

app.get("/home", (req, res, next) => {
    try {
        var data = jwt.verify(req.cookies.data, 'hana');
    } catch (error) {

    }
    console.log('home ', data);
    res.render('home');
});

app.post("/", (req, res, next) => {
    if (req.body.username == 'a' && req.body.password == 'a') {
        var data;
        try {
            data = jwt.sign({
                isAuthenticated: true,
                accountID: 123,
                username: 'a',
            }, 'hana');
            console.log('here ', data);
        } catch (error) {

        }
        res.cookie('data', data, { expires: new Date(Date.now() + 900000)});
        res.redirect('/home');
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});