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
      const id = args.id;
      const actor = _.find(Actors, { id: Number(id) });
      return actor;
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
    addActor: (parent, args) => {
      const actor = args.input;
      const lastId = Actors[Actors.length - 1].id;
      actor.id = lastId + 1;
      Actors.push(actor);
      return actor;
    },
  },
};

module.exports = { resolvers };
