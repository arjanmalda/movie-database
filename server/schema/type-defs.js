const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    movies: [Movie!]!
    movie(id: ID!): Movie!
    actors: [Actor!]!
    actor(actor: String): Actor!
  }

  type Movie {
    id: ID!
    movie: String!
    duration: String!
    actors: [Actor]!
  }

  type Actor {
    id: ID!
    actor: String!
    nationality: String!
  }

  type Mutation {
    addMovie(movieInput: AddMovieInput!): Movie
    addActor(input: AddActorInput!): Actor
    linkActor(input: LinkActorInput!): Actor
  }

  input AddMovieInput {
    id: ID!
    movie: String!
    duration: String!
  }

  input LinkActorInput {
    id: ID!
    actor: String!
    nationality: String!
  }

  input AddActorInput {
    actor: String!
    nationality: String!
  }
`;

module.exports = { typeDefs };
