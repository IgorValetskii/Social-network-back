const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
// const verifyToken = require('./verifyToken');


const options = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Hello World', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: ['./routes/users.js', './routes/leagues.js', './routes/stages.js', './routes/races.js']
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);


// app.get('/api-docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// });


//Routes
const login = require('./routes/userlogin');
const users = require('./routes/users');
const leagues = require('./routes/leagues');
const stages = require('./routes/stages');
const races = require('./routes/races');

//Middlewares
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Routes
app.use('/api/login', login);
app.use('/users',  users);
app.use('/leagues', leagues);
app.use('/stages', stages);
app.use('/races', races);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Igor:1q2w3e4r@cluster0-cmtpz.mongodb.net/users', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(3010, () => {
            console.log('Example app listening on port 3010!');
        });
    } catch (e) {
        console.log(e);
    }
}

start();
