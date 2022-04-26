const { Movies, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    movies: () => {
      return Movies;
    },
    movie: (parent, args) => {
      const id = args.id;
      const movie = _.find(Movies, { id: Number(id) });
      return movie;
    },
  },

  Mutation: {
    addMovie: (parent, args) => {
      const movie = args.input;
      const lastId = Movies[Movies.length - 1].id;
      movie.id = lastId + 1;
      Movies.push(movie);
      return movie;
    },
  },
};

module.exports = { resolvers };
