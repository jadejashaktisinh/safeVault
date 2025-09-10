const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieparser = require("cookie-parser");
const routes = require('./routes/route')
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieparser());

require('./Database/dbconnection')

app.use('/', routes)
app.listen(3000, () => {
    console.log("sever start");

})
