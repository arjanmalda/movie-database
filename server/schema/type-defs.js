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
    actors: [Actor]
    image: String!
  }

  type Actor {
    id: ID!
    actor: String!
    nationality: String!
    image: String!
  }

  type Mutation {
    addMovie(movieInput: AddMovieInput!): String
    addActor(input: AddActorInput!): String
    deleteMovie(id: String!): String
    deleteActor(id: String!): String
    changeMovie(input: ChangeMovieInput!): String
    changeActor(input: ChangeActorInput!): String
  }

  input ChangeMovieInput {
    movie: String!
    duration: String
    image: String
  }

  input ChangeActorInput {
    actor: String!
    nationality: String
    image: String
  }

  input AddMovieInput {
    movie: String!
    duration: String!
    image: String!
    actor: String!
  }

  input AddActorInput {
    actor: String!
    nationality: String!
    image: String!
  }
`;

module.exports = { typeDefs };
