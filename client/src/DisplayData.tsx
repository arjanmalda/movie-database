import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

interface Movie {
  id: string | undefined;
  movie: string | undefined;
  duration: string | undefined;
}

interface Actor {
  id: string | undefined;
  actor: string | undefined;
  nationality: string | undefined;
}

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      movie
      duration
    }
  }
`;

const QUERY_ALL_ACTORS = gql`
  query GetAllActors {
    actors {
      id
      actor
      nationality
    }
  }
`;

const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: AddMovieInput!) {
    addMovie(input: $input) {
      movie
      duration
    }
  }
`;

const ADD_ACTOR_MUTATION = gql`
  mutation AddActor($input: AddActorInput!) {
    addActor(input: $input) {
      actor
      nationality
    }
  }
`;

function DisplayData() {
  const [movieName, setMovieName] = useState("");
  const [duration, setDuration] = useState("");
  const [actorName, setActor] = useState("");
  const [nationality, setNationality] = useState("");

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

  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);
  const [addActor] = useMutation(ADD_ACTOR_MUTATION);

  if (moviesLoading) {
    return <h1>MOVIES ARE LOADING...</h1>;
  }

  if (moviesError) {
    return (
      <>
        <h1>Movies could not be loaded...</h1>
        <h3>
          <a href="http://http://localhost:3000">Try again</a>
        </h3>
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
          <a href="http://http://localhost:3000">Try again</a>
        </h3>
      </>
    );
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Movie name..."
          onChange={(event) => {
            setMovieName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Duration..."
          onChange={(event) => {
            setDuration(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Actor name..."
          onChange={(event) => {
            setActor(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value);
          }}
        />

        <button
          onClick={() => {
            addMovie({
              variables: {
                input: { movie: movieName, duration: duration },
              },
            });
            addActor({
              variables: {
                input: { actor: actorName, nationality: nationality },
              },
            });

            moviesRefetch();
            actorsRefetch();
          }}
        >
          Add
        </button>
      </div>
      {movieData &&
        movieData.movies.map((movie: Movie) => {
          return (
            <div key={movie.id}>
              <h1>Movie: {movie.movie}</h1>
              <h3>Duration: {movie.duration}</h3>
            </div>
          );
        })}
      ---------------------------------------------------------------------------------------------
      {actorData &&
        actorData.actors.map((actor: Actor) => {
          return (
            <div key={actor.id}>
              <h1>Actor: {actor.actor}</h1>
              <h3>Nationality: {actor.nationality}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default DisplayData;
