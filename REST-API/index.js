const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require("helmet");
const userRoute = require('./routes/user');
const pageNotFound = require('./middleware/PageNotFound');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(helmet());
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 3000
        });
        console.log("Connect DB successfully!!")
    } catch (error) {
        console.log("Connect DB failed");
    }
}
connectDB();

mongoose.connection.on("connected", () => {
    console.log("Connected MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log(error.message);
});

app.get('/', (req, res) => {
    res.send("Xin chao den voi NodeJS");
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected MongoDB");
});
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

app.use('/api/v1/user', userRoute);

app.use('*', pageNotFound);

app.listen(port, () => console.log(`App listening on: http://localhost:${port}`));