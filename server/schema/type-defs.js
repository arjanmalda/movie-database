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
`;

module.exports = { typeDefs };
