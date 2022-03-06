const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')

const mysql = require('mysql');

const conDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs",
});
conDB.connect((err) => {
    if (err) throw err;
    console.log("connect db success");
});

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
    conDB.query(query, (err, result) => {
        if (err) throw err;
        res.redirect("/view");
    });
});

app.get("/view", (req, res, next) => {
    const query = "SELECT * From data";
    conDB.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.render('view', {
            result
        })
    });
});

app.get("/update/:id", (req, res, next) => {
    const query = `SELECT * From data WHERE dataid = '${req.params.id}'`;
    conDB.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.render('edit', {
            result: result[0]
        })
    });
});

app.put("/update/:id", (req, res, next) => {
    const query = `UPDATE data SET dataname = '${req.body.name}' WHERE dataid = '${req.body.id}'`;
    conDB.query(query, (err, result) => {
        if (err) throw err;
        res.redirect("/view");
    });
});

app.delete("/delete/:id", (req, res, next) => {
    const query = `DELETE FROM data WHERE dataid = '${req.params.id}'`;
    conDB.query(query, (err, result) => {
        if (err) throw err;
        res.redirect("/view");
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
