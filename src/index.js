const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { connectDB } = require("./db/dbconnection");
const routes = require("./routes/v1");
require("./helpers/crons");
const config = require("./config/config");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

/** Get image */
app.use(express.static(`./public`));

/** Name space */
app.use("/v1", routes);

app.use((req, res, next) => {
    next(new Error("Route not found!"));
});

/** Database connection */
connectDB();

/** Create server */
const server = http.createServer(app);

server.listen(config.port, () => {
    console.log("server listning port number " + config.port);
});