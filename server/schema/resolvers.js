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
      // const lastId = Movies[Movies.length - 1].id;
      // movie.id = 4;
      Movies.push(movie);
      return args.input.id;
    },

    linkActor: (parent, args) => {
      const actor = args.input;
      console.log(args.input);
      Movies[Movies.length - 1].actors.push(actor);
      return args.input.id;
    },

    addActor: (parent, args) => {
      const actor = args.input;
      const lastId = Actors[Actors.length - 1].id;
      actor.id = lastId + 1;
      Actors.push(actor);
      return args.input.id;
    },

    deleteMovie: (parent, { id }) => {
      Movies.splice(Movies.indexOf(Movies.find((movie) => movie.id == id)), 1);
      return id;
    },
  },
};

module.exports = { resolvers };
