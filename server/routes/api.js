const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

console.log('API.JS');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/hbsdc', (err, client) => {
        if (err) return console.log(err);
        console.log('connect');
        var db = client.db('hbsdc');
        closure(db);
    });
}

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get forms
router.get('/form', (req, res) => {
    console.log('getform called');
    year = ( req.query.Year -1) + '/' + req.query.Year;
    FormType = req.query.FormType;
    LAReference = req.query.LAReference;
  
    connection((db) => {
        db.collection('form')
            .find({ CYear_Year: year, CForm_Form : FormType, C002_AuthRef: LAReference})
            .toArray()
            .then((form) => {
                console.log(form);
                response.status = 200;
                response.data = form;
                response.message = null;
                res.json(response);                
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/getLADetails', (req, res) => {
    console.log('localAuthorities called');     
    
    connection((db) => {
        db.collection('localAuthorities')
            .find()
            .toArray()
            .then((LAs) => {
                console.log(LAs);
                console.log('localAuthorities returing');
                response.status = 200;
                response.data = LAs;
                response.message = null;
                res.json(response);                
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/forms', (req, res) => {
    console.log('forms');     
    
    connection((db) => {
        db.collection('form')
            .find()
            .toArray()
            .then((forms) => {
                console.log(users);
                response.status = 200;
                response.data = forms;
                response.message = null;
                res.json(response);                
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Defined get data(index or listing) route
router.get('/', (req, res) => {
    console.log('/');
});

router.get('*', (req, res) => {
    console.log('*');  
    response.data = [];
    sendError('No match', res);
});    


router.post('/add', (req, res) => {
    console.log('/add');
    console.log(req.body);
    connection((db) => {
        db.collection('form').
        insertOne(req.body, function(err, res) {  
            if (err) throw err;  
            console.log("1 record inserted");  
            });

  });
});

module.exports = router;