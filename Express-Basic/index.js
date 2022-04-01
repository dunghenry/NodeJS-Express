const express = require('express');
const app = express();
const port = 4000;
const userRoute = require('./routes/user');
app.get("/", (req, res) => {
    res.send("Xin chào đến với NodJS");
})
app.use("/api/v1", userRoute);
app.listen(port, () => console.log("App started on http://localhost:" + port));