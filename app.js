const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieparser = require("cookie-parser");
const userRoute = require("./src/routers/userRoutes");
const errorMiddleware = require("./src/middleware/error");


const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieparser());
app.use(cors());


app.use("/api/v1" ,userRoute)


app.use(errorMiddleware)



app.get("/", (req, res) => {
    res.json({
        message: "API working fine.........."
    })
})




module.exports = app;