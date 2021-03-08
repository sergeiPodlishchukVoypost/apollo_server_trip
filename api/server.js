"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

// const tripsRouters = require("./trips/trips.routers");

// const { ApolloServer } = require("apollo-server-express");

const schema = require("./shema");

const tripModel = require("./trips/trips.model");

const PORT = 4545;
const MONGO_DB_URL =
  "mongodb+srv://SergeiPodlishchuk:fbm6!E-HPvYMd2k@cluster0.x1opf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
app.use(cors());
// app.use("/", tripsRouters);

const root = {
  trips: async () => {
    return await tripModel.find();
  },
  createTrip: async (input) => {
    console.log("input", input);
    return await tripModel.create(input);
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

// const resolvers = {
//   Query: {
//     trips: () => trips,
//   },
// };

// const server = new ApolloServer({
//   schema,
//   resolvers,
// });

// server.applyMiddleware({ app });

// console.log(server);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
