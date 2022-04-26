const { gql } = require("apollo-server");

const typeDefs = gql`
  type Movie {
    id: ID!
    movie: String!
    duration: String!
  }

  type Query {
    movies: [Movie!]!
    movie(id: ID!): Movie!
  }

  input AddMovieInput {
    movie: String!
    duration: String!
  }

  type Mutation {
    addMovie(input: AddMovieInput!): Movie
  }

  type Actor {
    id: ID!
    actor: String!
    nationality: String!
  }

  type Query {
    actors: [Actor!]!
    actor(id: ID!): Actor!
  }

  input AddActorInput {
    actor: String!
    nationality: String!
  }

  type Mutation {
    addActor(input: AddActorInput!): Actor
  }
`;

module.exports = { typeDefs };
