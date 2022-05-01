import AddMovieForm from "./forms/AddMovieForm";
import ChangeMovieForm from "./forms/ChangeMovieForm";
import AddActorForm from "./forms/AddActorForm";
import ChangeActorForm from "./forms/ChangeActorForm";

import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import { Rating, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Movie {
  id: string | undefined;
  movie: string | undefined;
  duration: string | undefined;
  actors: { id: string; actor: string; nationality: string; image: string }[];
  image: string | undefined;
}

export interface Actor {
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

const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($movieInput: AddMovieInput!) {
    addMovie(movieInput: $movieInput)
  }
`;

const ADD_ACTOR_MUTATION = gql`
  mutation AddActor($input: AddActorInput!) {
    addActor(input: $input)
  }
`;

const LINK_ACTOR_MUTATION = gql`
  mutation LinkActor($input: LinkActorInput!) {
    linkActor(input: $input)
  }
`;

const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($deleteMovieId: String!) {
    deleteMovie(id: $deleteMovieId)
  }
`;

const DELETE_ACTOR_MUTATION = gql`
  mutation DeleteActor($deleteActorId: String!) {
    deleteActor(id: $deleteActorId)
  }
`;

const CHANGE_MOVIE_MUTATION = gql`
  mutation ChangeMovie($input: ChangeMovieInput!) {
    changeMovie(input: $input)
  }
`;

const CHANGE_ACTOR_MUTATION = gql`
  mutation ChangeActor($input: ChangeActorInput!) {
    changeActor(input: $input)
  }
`;

const DisplayData = () => {
  const [movieName, setMovieName] = useState("");
  const [duration, setDuration] = useState("");
  const [actorName, setActorName] = useState("");
  const [nationality, setNationality] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [actorImage, setActorImage] = useState("");
  const [movieChangeForm, setMovieChangeForm] = useState(false);
  const [actorChangeForm, setActorChangeForm] = useState(false);
  const [rating, setRating] = useState<null | number>(0);

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

  const [addMovie] = useMutation(ADD_MOVIE_MUTATION, {
    onCompleted({ addMovie }) {
      if (addMovie) {
        linkActor({
          variables: {
            input: {
              actor: actorName,
              nationality: nationality,
              image: actorImage,
            },
          },
        });
      }
    },
  });
  const [addActor] = useMutation(ADD_ACTOR_MUTATION);
  const [linkActor] = useMutation(LINK_ACTOR_MUTATION);
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION);
  const [deleteActor] = useMutation(DELETE_ACTOR_MUTATION);
  const [changeMovie] = useMutation(CHANGE_MOVIE_MUTATION);
  const [changeActor] = useMutation(CHANGE_ACTOR_MUTATION);

  console.log(actorData);

  if (moviesLoading) {
    return (
      <>
        <h1>MOVIES ARE LOADING...</h1>
        <img
          loading="lazy"
          src="https://c.tenor.com/HKpAobwCaGIAAAAM/countdown-movie-countdown.gif"
        ></img>
      </>
    );
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
        {movieChangeForm ? (
          <ChangeMovieForm
            addMovie={addMovie}
            linkActor={linkActor}
            moviesRefetch={moviesRefetch}
            actorsRefetch={actorsRefetch}
            setMovieName={setMovieName}
            setDuration={setDuration}
            setMovieImage={setMovieImage}
            setActorName={setActorName}
            actorData={actorData}
            movieName={movieName}
            duration={duration}
            movieImage={movieImage}
            actorName={actorName}
            nationality={nationality}
            actorImage={actorImage}
            setMovieChangeForm={setMovieChangeForm}
            movieChangeForm={movieChangeForm}
            changeMovie={changeMovie}
          />
        ) : (
          <AddMovieForm
            addMovie={addMovie}
            linkActor={linkActor}
            moviesRefetch={moviesRefetch}
            actorsRefetch={actorsRefetch}
            setMovieName={setMovieName}
            setDuration={setDuration}
            setMovieImage={setMovieImage}
            setActorName={setActorName}
            actorData={actorData}
            movieName={movieName}
            duration={duration}
            movieImage={movieImage}
            actorName={actorName}
            nationality={nationality}
            actorImage={actorImage}
            setMovieChangeForm={setMovieChangeForm}
            movieChangeForm={movieChangeForm}
          />
        )}
        <div className="form-margin"></div>
        {actorChangeForm ? (
          <AddActorForm
            addMovie={addMovie}
            linkActor={linkActor}
            moviesRefetch={moviesRefetch}
            actorsRefetch={actorsRefetch}
            setMovieName={setMovieName}
            setDuration={setDuration}
            setMovieImage={setMovieImage}
            setActorName={setActorName}
            actorData={actorData}
            movieName={movieName}
            duration={duration}
            movieImage={movieImage}
            actorName={actorName}
            nationality={nationality}
            actorImage={actorImage}
            setNationality={setNationality}
            setActorImage={setActorImage}
            addActor={addActor}
            actorChangeForm={actorChangeForm}
            setActorChangeForm={setActorChangeForm}
          />
        ) : (
          <ChangeActorForm
            addMovie={addMovie}
            linkActor={linkActor}
            moviesRefetch={moviesRefetch}
            actorsRefetch={actorsRefetch}
            setMovieName={setMovieName}
            setDuration={setDuration}
            setMovieImage={setMovieImage}
            setActorName={setActorName}
            actorData={actorData}
            movieName={movieName}
            duration={duration}
            movieImage={movieImage}
            actorName={actorName}
            nationality={nationality}
            actorImage={actorImage}
            setNationality={setNationality}
            setActorImage={setActorImage}
            addActor={addActor}
            actorChangeForm={actorChangeForm}
            setActorChangeForm={setActorChangeForm}
            changeActor={changeActor}
          />
        )}
      </div>
      <div className="movie-list-container">
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
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <h1>{movie.movie}</h1>
                    <h3>Duration: {movie.duration}</h3>
                    <img loading="lazy" src={movie.image}></img>
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
                      {movie.actors &&
                        movie.actors.map((actor) => {
                          return (
                            <div className="actor-tile" key={actor.id}>
                              <div>
                                <div className="actor-name">{actor.actor}</div>
                                <div className="nationality">
                                  Nationality: {actor.nationality}
                                </div>
                                <img loading="lazy" src={actor.image}></img>
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
      <div className="actor-list-container">
        <h1>Available actors</h1>
        <div className="actor-list">
          {actorData.actors &&
            actorData.actors.map((actor: Actor) => {
              return (
                <div className="actor-tile" key={actor.id}>
                  <div>
                    <div className="actor-name">{actor.actor}</div>
                    <div className="nationality">
                      Nationality: {actor.nationality}
                    </div>
                    <img loading="lazy" src={actor.image}></img>
                    <IconButton
                      onClick={() => {
                        actor.id &&
                          deleteActor({
                            variables: {
                              deleteActorId: actor.id.toString(),
                            },
                          });
                        actorsRefetch();
                      }}
                      className="movie-delete-icon"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
