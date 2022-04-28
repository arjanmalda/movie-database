const { Movies, Actors } = require("../FakeData");
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
    actors: () => {
      return Actors;
    },
    actor: (parent, args) => {
      const actor = args.actor;
      const actors = _.find(Actors, { actor: String(actor) });
      return actors;
    },
  },

  Mutation: {
    addMovie: (parent, args) => {
      const movie = args.input;
      console.log(movie);
      // const lastId = Movies[Movies.length - 1].id;
      // movie.id = 4;
      Movies.push(movie);
      return args.input.id;
    },

    linkActor: (parent, args) => {
      const actor = args.input;

      Movies[Movies.length - 1].actors.push(actor);
      return args.input.id;
    },

    addActor: (parent, { input }) => {
      const lastId = Actors.length;
      input.id = lastId + 1;
      console.log(input);
      Actors.push(input);
      return input.id;
    },

    deleteMovie: (parent, { id }) => {
      Movies.splice(Movies.indexOf(Movies.find((movie) => movie.id == id)), 1);
      return id;
    },
  },
};

module.exports = { resolvers };
