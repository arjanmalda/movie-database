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
      Movies.push(movieInput);
      return movieInput.id;
    },

    linkActor: (parent, { input }) => {
      const actor = input;
      if (Movies[Movies.length - 1].actors) {
        actor.id = Movies[Movies.length - 1].actors.length + 1;
      } else {
        actor.id = 1;
      }
      Movies[Movies.length - 1].actors = [actor];

      return "success";
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
  },
};

module.exports = { resolvers };
