"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const { graphqlHTTP } = require("express-graphql");

const tripsRouters = require("./trips/trips.routers");

const { ApolloServer, gql } = require("apollo-server-express");

// const schema = require("./shema");

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

const typeDefs = gql`
  type Trip {
    id: ID!
    from: Location!
    to: Location!
  }

  type Location {
    name: String!
  }

  input CreateTripInput {
    fromPlaceId: String!
    toPlaceId: String!
  }
  type Query {
    trips(offset: Int, limit: Int): [Trip!]!
  }

  type Mutation {
    createTrip(input: CreateTripInput!): Trip
  }
`;

const resolvers = {
  Query: {
    trips: async () => {
      return await tripModel.find();
    },
  },
  Mutation: {
    createTrip: async (parent, { input }, context) => {
      const obj = JSON.parse(JSON.stringify(input));
      console.log(obj);

      const newTrip = {
        from: { name: "KH" },
        to: { name: "KIEV" },
      };

      await tripModel.create(newTrip);

      return newTrip;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server start on port ${PORT} ${server.graphqlPath}`);
});
