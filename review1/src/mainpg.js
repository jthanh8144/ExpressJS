// import database from './models/index';

const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

const db = require('./db');
const client = db.connect();

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

app.use(methodOverride('_method'));

app.get("/", (req, res, next) => {
    res.render('add');
});

app.post("/", (req, res, next) => {
    const query = `INSERT INTO data VALUES ('${req.body.id}', '${req.body.name}')`;
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/view');
    });
});

app.get("/view", (req, res, next) => {
    const query = "SELECT * From data";
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render('view', {
                result: result.rows
            });
        }
    })
});

app.get("/update/:id", (req, res, next) => {
    const query = `SELECT * From data WHERE dataid = '${req.params.id}'`;
    console.log(query);
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render('edit', {
                result: result.rows[0]
            });
        }
    });
});

app.put("/update/:id", (req, res, next) => {
    const query = `UPDATE data SET dataname = '${req.body.name}' WHERE dataid = '${req.body.id}'`;
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/view');
    });
});

app.delete("/delete/:id", (req, res, next) => {
    const query = `DELETE FROM data WHERE dataid = '${req.params.id}'`;
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/view');
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
