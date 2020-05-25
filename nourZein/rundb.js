const MongoClient = require("mongodb").MongoClient;
const controller = require("./app/controller/controller");
module.exports = function(url, app, serve, dir) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, database) => {
      if (err) {
        console.log("Mongo Error: " + err);
        process.exit(1);
      }
      console.log("Mongo connected. Starting services.");
      const db = database.db("thesis");
      controller(app, db, dir);
      serve();
    }
  );
};
