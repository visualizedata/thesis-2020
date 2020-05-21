//Nour

module.exports = function(app, db, dir) {
  let FILTEREDIDS = [];
  // simple route
  app.get("/", (req, res) => {
    res.render("landing.html");
    //res.sendFile(dir + "/app/assets/views/index.html");
    //res.json({ message: "slash" });
  });

  app.get("/index", (req, res) => {
    res.render("index.html");
  });
  app.get("/about", (req, res) => {
    res.render("about.html");
  });

  // app.get("/", (req, res) => {
  //   res.sendFile(dir + "/app/assets/views/landing.html");
  //   //res.json({ message: "slash" });
  // });

  // app.get("/one", (req, res) => {
  //   db.collection("thesis_data")
  //     .findOne({})
  //     .then(
  //       doc => res.json(doc),
  //       err => res.status(500).json({ err: err })
  //     );
  // });

  function boroughQuery(query) {
    if (query === undefined) {
      query = {};
    }
    return db
      .collection("thesis_data")
      .aggregate([
        { $match: query },
        {
          $group: {
            _id: "$borough",
            count: {
              $sum: "$area"
            }
          }
        }
      ])
      .toArray();
  }

  app.post("/boroughAreas", (req, res) => {
    boroughQuery().then(
      result => {
        let areaByBorough = result
          .filter(item => item._id != null)
          .map(item => {
            item._id = boroughName[item._id]; //object looking up values of attributes
            return item;
          });
        console.log(result);

        res.json(areaByBorough); //an object with two properities
      },
      err => res.status(500).json({ err: err })
    );
  });

  const boroughName = {
    BK: "Brooklyn",
    BX: "Bronx",
    QN: "Queens",
    SI: "Staten Island",
    MN: "Manhattan"
  };

  app.post("/mapFilter", (req, res) => {
    // console.log(req.body.query.ownership);
    let {
      private,
      public,
      areaQ,
      residential,
      commercial,
      mixed,
      manufacturing,
      publicFacilities,
      other
    } = req.body.query;

    // }
    let query = {
      $and: []
    };
    const publicPrivateVals = [];
    const landuseVals = [];

    if (
      !(
        (residential &&
          commercial &&
          mixed &&
          manufacturing &&
          publicFacilities &&
          other) ||
        (!residential &&
          !commercial &&
          !mixed &&
          !manufacturing &&
          !publicFacilities &&
          !other)
      )
    ) {
      if (residential) {
        landuseVals.push("1", "2", "3");
      }
      if (commercial) {
        landuseVals.push("5");
      }
      if (manufacturing) {
        landuseVals.push("6");
      }
      if (mixed) {
        landuseVals.push("4");
      }
      if (publicFacilities) {
        landuseVals.push("7", "8", "9");
      }
      if (other) {
        landuseVals.push("10", "11");
      }
      if (landuseVals.length !== 0) {
        query.$and.push({ landuse: { $in: landuseVals } });
      }
    }

    //if (!((public && private && mixed) || (!public && !private && !mixed))) {
    if (!((public && private) || (!public && !private))) {
      //this is to check that not both are uncheck. SO if both unchecked, do nothing and then $and will be empty
      if (public) {
        publicPrivateVals.push("C", "O", "X", "M");
      }
      if (private) {
        publicPrivateVals.push(null, "P");
      }
      // if (mixed) {
      //   publicPrivateVals.push("M");
      // }

      //only put in owner type if the public private vals exist
      if (publicPrivateVals.length !== 0) {
        query.$and.push({ owner_type: { $in: publicPrivateVals } });
      }

      //then always push height & area
    }
    query.$and.push(
      { area: { $lte: areaQ[1] } },

      {
        area: { $gte: areaQ[0] }
      }
      // ,{
      //   roof_height: { $lte: heightQ[1] } //change [0], and [1] as minimum and max
      // },
      // {
      //   roof_height: { $gte: heightQ[0] }
      // }
    );
    //if there is no query, remove the $and and query everything back
    if (query.$and.length === 0) {
      query = {};
    }
    console.log(JSON.stringify(query));

    let promise1 = db
      .collection("thesis_data")
      //.findOne({});
      .find(
        query,
        { projection: { _id: 1 } }
        // $or: [
        //   // { "properties.owner_type": "X" }
        //   // { "properties.owner_type": { $ne: "C" } },
        //   // { "properties.owner_type": { $ne: "M" } },
        //   { "properties.owner_type": "P" },
        //   { "properties.owner_type": null }
        // ]
      )
      .toArray();

    let promise2 = boroughQuery(query);

    Promise.all([promise1, promise2]).then(
      values => {
        console.log("result", values[0].length);
        FILTEREDIDS = values[0].map(obj => obj._id);
        let areaByBorough = values[1]
          .filter(item => item._id != null)
          .map(item => {
            item._id = boroughName[item._id]; //object looking up values of attributes
            return item;
          });

        res.json({ filteredIds: FILTEREDIDS, areaByBorough }); //an object with two properities
      },
      err => res.status(500).json({ err: err })
    );
  });
};
