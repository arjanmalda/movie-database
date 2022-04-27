const Movies = [
  {
    id: "1",
    movie: "The Batman",
    duration: "2:56",
    actors: [{ id: "1", actor: "Robert Pattinson", nationality: "British" }],
  },
  {
    id: "2",
    movie: "Shutter Island",
    duration: "2:18h",
    actors: [{ id: "2", actor: "Leonardo DiCaprio", nationality: "American" }],
  },
  {
    id: "3",
    movie: "Saving Private Ryan",
    duration: "2:49h",
    actors: [{ id: "3", actor: "Tom Hanks", nationality: "American" }],
  },
];

const Actors = [
  {
    id: "1",
    actor: "Robert Pattinson",
    nationality: "British",
  },
  {
    id: "2",
    actor: "Leonardo DiCaprio",
    nationality: "American",
  },
  {
    id: "3",
    actor: "Tom Hanks",
    nationality: "American",
  },
];

module.exports = { Movies, Actors };
