const express = require('express');
// const morgan = require('morgan');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')

const route = require('./routes');
const db = require('./config/db');

const sortMiddleware = require('./app/middlewares/sortMiddleware');

// Connect to DB
db.connect();

// static file
app.use(express.static(path.join(__dirname, 'public')));

//
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middleware
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars')
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
