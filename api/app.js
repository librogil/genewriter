const express = require('express');
const app = express();
const path = require('path');

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

const { Thing, Conditional, TwoValues, Nonconditional, Ratio } = require('./db/models');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, _id");
    next();
});

app.use('', express.static(path.join(__dirname, '../frontend/dist/frontend')));

app.get('/api', (req, res) => {
    Thing.find({}).then((things) => {
        res.send(things);
    })
})

app.get('/api/new', (req, res) => {
    TwoValues.find({}).then((twoValues) => {
        Conditional.find({}).then((conditional) => {
            Nonconditional.find({}).then((nonconditional) => {
                Ratio.find({}).then((ratio) => {
                    let data = {twoValues: twoValues, conditional: conditional, nonconditional: nonconditional, ratio: ratio};
                    res.send(data);
                });
            });
        });
    });
});

app.post('/api', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let writer = req.body.writer;
    let description = req.body.description;
    let date = req.body.date;

    let newThing = new Thing({
        description,
        title,
        content,
        writer,
        date,
    });
    newThing.save().then((things) => {
        res.send(things);
    })
});

app.get('/api/thing/:thingID', (req, res) => {
    Thing.findOne({
        _id: req.params.thingID
    }).then((things) => {
        res.send(things);
    })
})

app.get('/api/search/:searchTerm', (req, res) => {
    Thing.find({
    }).then((things) => {
        res.send(things);
    })
})

app.patch('/api/thing/:thingID', (req, res) => {
    Thing.findOneAndUpdate({ _id: req.params.thingID }, {
        $push: { comments: req.body.title },
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

const d_port = 3000; // for developing
const p_port = process.env.PORT || 8080; // for production

app.listen(p_port, () => {
    console.log("Server is listening on PORT or 8080");
})