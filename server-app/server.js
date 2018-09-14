// import {express} from './node_modules/express/lib';
// import {http} from './node_modules/http';
// import {jwt} from './node_modules/jsonwebtoken/lib';
// import {bodyPasrer} from './node_modules/body-parser/lib';

const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const bodyPasrer = require('body-parser');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); next();
});

app.use(bodyPasrer.urlencoded({ extended: true }));
app.use(bodyPasrer.json());

const SECRET_KEY = 'OneSecret';
const userdata = {
    username: 'kalinka',
    avatar: 'http://demo.powowbox.com/powowbox/avatar_demo/Jane_0001.png',
    first_name: 'Kalina',
    last_name: 'Malina',
    email: 'kalinamalina@AbstractEmitterVisitor.bg',
    birthday: '11.07.1999',
    is_active: true,
    date_joined: '11.09.2018',
    last_login: '14.09.2018',
    debet: 20.00,
    credit_limit: 30.00,
    notification_threshold: 20.00000,
    currency: '$',
    currency_name: 'USD',
    paypal_payments: true,
    borica_payments: true,
    cpa_redirect: "http(s)://offerurl.com/?offer_id={offer_id}&",
    cpa_postback: "https://dev.adcharge.eu/api/cpa/response/?sid={click_id}",
}


app.get('/', (req, res) => {
    res.status(200).send('Hello server!')
})
app.post('/api/auth-token/', (req, res, next) => {
console.log('In function login')
    // var result = {username: req.body.username, password:req.body.password}
    // res.send(result);

    if (req.body.username == 'homeWork' && req.body.password == 'homeWork') {
        var token = jwt.sign(req.body.username, SECRET_KEY);
        var data = { token: token, espires_date: Date.now() + 1000000000000 }
        res.status(200).send(data);
    }
    res.status(400).send('Invalid credentials');
    next();
})

app.get('/api/ui/userdata/', ensureToken, (req, res, next) => {

    jwt.verify(req.token, SECRET_KEY, function (err, req) {
        console.log('In get req.token = ', req.token)
        if (err) {
            res.status(403).send('Operation impossible!');
        }
    });

    var decodedToken = jwt.decode(req.token);
    console.log('decoded token ', decodedToken);

    if (decodedToken == 'homeWork') {
        var data = userdata;
        res.status(200).send(data);
    } else {
        res.status(400).send('Invalid token');
    }
});

function ensureToken(req, res, next) {

    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        console.log('bearer token ->', bearerToken);

        req['token'] = bearerToken;
        console.log('req.token - ->', req.token);

        next();
    } else {
        res.status(403).send('Invalid token');
    }
};

module.exports = app;
server.listen(PORT, function () {
    console.log('Server listen at ' + PORT);
})
