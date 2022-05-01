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
    addMovie: (parent, { movieInput }) => {
      const lastId = Movies[Movies.length - 1].id;
      movieInput.id = (+lastId + 1).toString();
      const actor = Actors.find((actor) => actor.actor === movieInput.actor);
      movieInput.actors = [actor];
      console.log(movieInput.actor);
      Movies.push(movieInput);
      return movieInput.id;
    },

    addActor: (parent, { input }) => {
      const lastId = Actors[Actors.length - 1].id;
      input.id = (+lastId + 1).toString();

      Actors.push(input);
      return input.id;
    },

    deleteMovie: (parent, { id }) => {
      Movies.splice(Movies.indexOf(Movies.find((movie) => movie.id == id)), 1);
      return id;
    },
    deleteActor: (parent, { id }) => {
      Actors.splice(Actors.indexOf(Actors.find((actor) => actor.id == id)), 1);
      return id;
    },
    changeMovie: (parent, { input }) => {
      for (let i = 0; i < Movies.length; i++) {
        if (Movies[i].movie === input.movie) {
          Movies[i].duration = input.duration;
          Movies[i].image = input.image;
          break;
        }
      }
      return input.movie;
    },
    changeActor: (parent, { input }) => {
      for (let i = 0; i < Actors.length; i++) {
        if (Actors[i].actor === input.actor) {
          Actors[i].nationality = input.nationality;
          Actors[i].image = input.image;
          break;
        }
      }
      return input.actor;
    },
  },
};

module.exports = { resolvers };
