"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

// const tripsRouters = require("./trips/trips.routers");

const { ApolloServer, gql } = require("apollo-server-express");

const tripModel = require("./trips/trips.model");

const PORT = 4545;
const MONGO_DB_URL =
  "mongodb+srv://SergeiPodlishchuk:fbm6!E-HPvYMd2k@cluster0.x1opf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const MAPBOX_API_TOKEN =
  "pk.eyJ1Ijoic2VyZ2lpcG9kbGlzaGNodWsiLCJhIjoiY2ttMGJjc2o0NDF6ODJubjFzdGV5ZTJtNiJ9.upVxFI-1HPQg9YIBuOY0tw";

axios.defaults.baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

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

const takeLocation = async (lat, lon) => {
  const getPlace = await axios.get(
    `${lat},${lon}.json?access_token=${MAPBOX_API_TOKEN}`
  );
  //   console.log(getPlace);
  const dataLocation = await getPlace.data.features[0].place_name;

  if (dataLocation) {
    return dataLocation;
  } else {
    return "i do not know this place";
  }
};

const resolvers = {
  Query: {
    trips: async () => {
      return await tripModel.find();
    },
  },
  Mutation: {
    createTrip: async (parent, { input }, context) => {
      const obj = JSON.parse(JSON.stringify(input));

      const locationFrom = obj.fromPlaceId.split(",");
      const locationTo = obj.toPlaceId.split(",");

      const from = await takeLocation(locationFrom[0], locationFrom[1]);
      const to = await takeLocation(locationTo[0], locationTo[1]);

      const newTrip = {
        from: { name: from },
        to: { name: to },
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
  console.log(`Server start on port ${PORT}${server.graphqlPath}`);
});
