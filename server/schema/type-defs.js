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
    image: String!
  }

  type Actor {
    id: ID!
    actor: String!
    nationality: String!
    image: String!
  }

  type Mutation {
    addMovie(movieInput: AddMovieInput!): Movie
    addActor(input: AddActorInput!): Actor
    linkActor(input: LinkActorInput!): Actor
  }

  input AddMovieInput {
    movie: String!
    duration: String!
    image: String!
  }

  input LinkActorInput {
    id: ID!
    actor: String!
    nationality: String!
  }

  input AddActorInput {
    actor: String!
    nationality: String!
    image: String!
  }
`;

module.exports = { typeDefs };
