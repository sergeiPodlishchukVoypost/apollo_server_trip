"use strict";

const express = require("express");
const mongoose = require("mongoose");
// const { ApolloServer } = require("apollo-server-express");

const tripsRouters = require("./trips/trips.routers");

const PORT = 4545;

const MONGO_DB_URL =
  "mongodb+srv://SergeiPodlishchuk:fbm6!E-HPvYMd2k@cluster0.x1opf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.applyMiddleware({ app });

(async function () {
  return await mongoose.connect(
    MONGO_DB_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },

    function (error) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("Database connection successful");
    }
  );
})();
const app = express();
app.use(express.json());
app.use("/", tripsRouters);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
