const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('combined'));
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log("Connect database successfully!!"));
    } catch (error) {
        console.error("Connect database failed!!");
    }
}
connectDB();
app.use('/api/v1/author', authorRoute);
app.use('/api/v1/book', bookRoute);
app.listen(port, () => console.log(`App started on port http://localhost:${port}`));

