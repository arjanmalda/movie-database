import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  MenuItem,
  Select,
  FormControl,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

interface Movie {
  id: string | undefined;
  movie: string | undefined;
  duration: string | undefined;
  actors: { id: string; actor: string; nationality: string; image: string }[];
  image: string | undefined;
}

interface Actor {
  id: string | undefined;
  actor: string | undefined;
  nationality: string | undefined;
  image: string | undefined;
}

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      movie
      duration
      actors {
        id
        actor
        nationality
        image
      }
      image
    }
  }
`;

const QUERY_ALL_ACTORS = gql`
  query GetAllActors {
    actors {
      id
      actor
      nationality
      image
    }
  }
`;

const GET_ACTOR_BY_NAME = gql`
  query Actor($actor: String!) {
    actor(actor: $actor) {
      id
      actor
      nationality
    }
  }
`;

const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: AddMovieInput!) {
    addMovie(movieInput: $movieInput) {
      movie
      duration
      image
    }
  }
`;

const ADD_ACTOR_MUTATION = gql`
  mutation AddActor($input: AddActorInput!) {
    addActor(input: $input) {
      actor
      nationality
      image
    }
  }
`;

const LINK_ACTOR_MUTATION = gql`
  mutation LinkActor($input: LinkActorInput!) {
    linkActor(input: $input) {
      id
      actor
      nationality
    }
  }
`;

const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($deleteMovieId: String!) {
    deleteMovie(id: $deleteMovieId)
  }
`;

const DisplayData = () => {
  const [movieName, setMovieName] = useState("");
  const [duration, setDuration] = useState("");
  const [actorName, setActorName] = useState("");
  const [nationality, setNationality] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [actorImage, setActorImage] = useState("");
  const [rating, setRating] = useState<null | number>(0);
  const [linkedActors, setLinkedActors] = useState<
    Array<{ id: 1; actor: string; nationality: string }>
  >([]);

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
    refetch: moviesRefetch,
  } = useQuery(QUERY_ALL_MOVIES);
  const {
    data: actorData,
    loading: actorsLoading,
    error: actorsError,
    refetch: actorsRefetch,
  } = useQuery(QUERY_ALL_ACTORS);

  const [
    fetchActor,
    { data: individualActorData, error: individualActorError },
  ] = useLazyQuery(GET_ACTOR_BY_NAME);

  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);
  const [addActor] = useMutation(ADD_ACTOR_MUTATION);
  const [linkActor] = useMutation(LINK_ACTOR_MUTATION);
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION);

  if (moviesLoading) {
    return <h1>MOVIES ARE LOADING...</h1>;
  }

  if (moviesError) {
    return (
      <>
        <div className="error-background"></div>
        <h1>Movies could not be loaded...</h1>
        <Button color="error" variant="contained" href="http://localhost:3000">
          Try again
        </Button>
      </>
    );
  }

  if (actorsLoading) {
    return <h1>ACTORS ARE LOADING...</h1>;
  }

  if (actorsError) {
    return (
      <>
        <h1>Actors could not be loaded...</h1>
        <h3>
          <a href="http://localhost:3000">Try again</a>
        </h3>
      </>
    );
  }

  return (
    <div>
      <h1>Add a movie to the list below or create a new actor</h1>
      <div className="forms">
        <div className="movie-form">
          <FormControl>
            <TextField
              variant="standard"
              type="text"
              placeholder="Movie name..."
              onChange={(event) => {
                setMovieName(event.target.value);
              }}
            />

            <TextField
              variant="standard"
              className="text-field"
              type="text"
              color="primary"
              placeholder="Duration..."
              onChange={(event) => {
                setDuration(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              className="text-field"
              type="text"
              color="primary"
              placeholder="Image url..."
              onChange={(event) => {
                setMovieImage(event.target.value);
              }}
            />
            <br></br>
            <Select
              defaultValue={"Actor"}
              variant="filled"
              inputProps={{
                name: "select actor",
                id: "uncontrolled-native",
              }}
              className="select-input"
              label={"Actor"}
              onChange={(event) => {
                setActorName(event.target.value);
                setLinkedActors(individualActorData);
              }}
            >
              {actorData &&
                actorData.actors.map((actor: Actor) => {
                  return (
                    <MenuItem key={actor.id} value={actor.actor}>
                      {actor.actor}
                    </MenuItem>
                  );
                })}
            </Select>
            <br></br>
            <div className="button-container-movie">
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={() => {
                  addMovie({
                    variables: {
                      input: {
                        id: movieData.movies.length + 1,
                        movie: movieName,
                        duration: duration,
                      },
                    },
                  });

                  moviesRefetch();
                  actorsRefetch();
                }}
              >
                Add Movie
              </Button>
              <div className="button-space"></div>
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={() => {
                  linkActor({
                    variables: {
                      input: {
                        id: movieData.movies.length,
                        actor: "1",
                        nationality: "1",
                      },
                    },
                  });
                  moviesRefetch();
                }}
              >
                Link actor
              </Button>
            </div>
          </FormControl>
        </div>
        <div className="actor-form">
          <FormControl>
            <TextField
              variant="standard"
              type="text"
              placeholder="Actor name..."
              onChange={(event) => {
                setActorName(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              type="text"
              placeholder="Nationality..."
              onChange={(event) => {
                setNationality(event.target.value);
              }}
            />

            <TextField
              variant="standard"
              className="text-field"
              type="text"
              color="primary"
              placeholder="Image url..."
              onChange={(event) => {
                setActorImage(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <div className="button-container-actor">
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={() => {
                  addActor({
                    variables: {
                      input: { actor: actorName, nationality: nationality },
                    },
                  });

                  moviesRefetch();
                  actorsRefetch();
                }}
              >
                Add new actor
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
      <div className="movie-list">
        {movieData &&
          movieData.movies.map((movie: Movie) => {
            return (
              <div key={movie.id}>
                <div className="movie-tile">
                  <div className="movie-tile-header">
                    <IconButton
                      onClick={() => {
                        movie.id &&
                          deleteMovie({
                            variables: {
                              deleteMovieId: movie.id.toString(),
                            },
                          });
                        moviesRefetch();
                      }}
                      className="movie-delete-icon"
                    >
                      <CloseRounded />
                    </IconButton>
                  </div>
                  <h1>{movie.movie}</h1>
                  <h3>Duration: {movie.duration}</h3>
                  <img src={movie.image}></img>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                      return newValue;
                    }}
                  />
                  <br></br>
                  <h3>Cast:</h3>
                  <div>
                    {movie.actors.map((actor) => {
                      return (
                        <div className="actor-tile" key={actor.id}>
                          <div>
                            <div className="actor-name">{actor.actor}</div>
                            <div className="nationality">
                              Nationality: {actor.nationality}
                            </div>
                            <img src={actor.image}></img>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayData;
