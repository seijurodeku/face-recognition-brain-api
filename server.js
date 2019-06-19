const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         user: 'postgres',
//         password: 'test',
//         database: 'facerecognition'

//     }
// });

db.select('*').from('users').then(data => {
    console.log
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('It is working');
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)});

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)});

PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`app workin at port ${PORT}`);
});