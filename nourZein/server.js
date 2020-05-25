const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const dir = __dirname;
// set port
const PORT = process.env.PORT || 8080; //change port number to 3000 from 8080
const corsOptions = {
  origin: "http://localhost:8081"
};
dotenv.config();

app.use(cors(corsOptions));

app.set("views", path.join(dir, "/app/assets/views"));
// app.engine('.html', require('ejs'));
app.set("view engine", "ejs");
app.engine(".html", require("ejs").renderFile);

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//console.log(__dirname);

app.use(express.static(path.join(dir, "/app/assets")));
app.use("/images", express.static(path.join(dir, "/app/assets/images")));
app.use("/js", express.static(path.join(dir, "/app/assets/js")));
app.use("/css", express.static(path.join(dir, "/app/assets/css")));
app.use("/views", express.static(path.join(dir, "/app/assets/views")));

//app.use(express.static("views"));

//app.set("views", path.join(dir, "/app/assets/views"));

const mongoUrl =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@thesis-cluster-mcebm.mongodb.net/test?retryWrites=true&w=majority";
// "mongodb://localhost:27017/thesis";

function serve() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
const runIt = require("./rundb");
runIt(mongoUrl, app, serve, dir);
