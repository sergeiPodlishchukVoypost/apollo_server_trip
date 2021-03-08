"use strict";

const { buildSchema } = require("graphql");

const schema = buildSchema(` 
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
  
  
  `);

module.exports = schema;
