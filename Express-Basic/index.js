const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoot = require('./routes');
const userRoute = require('./routes/user');
const middleware = require('./middleware/middleware');
const cors = require('cors');
const morgan = require('morgan');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
const port = process.env.PORT || 4000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect database successfully!!");
    } catch (error) {
        console.log("Connect database failed!!");
    }
}
connectDB();

app.get("/", (req, res) => {
    res.send("Xin chào đến với NodJS");
})
app.post("/", (req, res) => {
    console.log(req.headers.token) //
    console.log(req.body);
    res.send("Xin chào đến với NodJS");
})
app.get("/:id", middleware.middleware, (req, res) => {
    console.log(req.params) // hi
    console.log(req.user); // { username: 'Tran Van Dung', password: 'Dung123', age: 21 }
    res.send("Xin chao");
})
app.use("/api/v1", userRoot);
app.use("/api/v1/auth", userRoute);
app.listen(port, () => console.log("App started on http://localhost:" + port));