import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

interface Movie {
  id: string | undefined;
  movie: string | undefined;
  duration: string | undefined;
  actors: { id: string; actor: string; nationality: string }[];
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
      actors {
        id
        actor
        nationality
      }
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

const ATTACH_ACTOR_MUTATION = gql`
  mutation LinkActor($input: LinkActorInput!) {
    linkActor(input: $input) {
      id
      actor
      nationality
    }
  }
`;

function DisplayData() {
  const [movieName, setMovieName] = useState("");
  const [duration, setDuration] = useState("");
  const [actorName, setActorName] = useState("");
  const [nationality, setNationality] = useState("");
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
  const [linkActor] = useMutation(ATTACH_ACTOR_MUTATION);

  if (moviesLoading) {
    return <h1>MOVIES ARE LOADING...</h1>;
  }

  if (moviesError) {
    return (
      <>
        <h1>Movies could not be loaded...</h1>
        <h3>
          <a href="http://localhost:3000">Try again</a>
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
          <a href="http://localhost:3000">Try again</a>
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
        <select
          placeholder="Actor name..."
          onChange={(event) => {
            setActorName(event.target.value);
            setLinkedActors(individualActorData);
            console.log(actorName);
          }}
        >
          {actorData &&
            actorData.actors.map((actor: Actor) => {
              return <option key={actor.id}>{actor.actor}</option>;
            })}
        </select>
        <button
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
        </button>
        <button
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
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Actor name..."
          onChange={(event) => {
            setActorName(event.target.value);
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
            addActor({
              variables: {
                input: { actor: actorName, nationality: nationality },
              },
            });

            moviesRefetch();
            actorsRefetch();
          }}
        >
          Create new actor
        </button>
      </div>
      {movieData &&
        movieData.movies.map((movie: Movie) => {
          return (
            <div key={movie.id}>
              <>
                <h1>Movie: {movie.movie}</h1>
                <h3>Duration: {movie.duration}</h3>
                <h2>Actors:</h2>
                {movie.actors.map((actor) => {
                  return (
                    <div key={actor.id}>
                      <h3>Main actor: {actor.actor}</h3>
                      <h3>Nationality: {actor.nationality}</h3>
                    </div>
                  );
                })}
              </>
            </div>
          );
        })}
      ---------------------------------------------------------------------------------------------
    </div>
  );
}

export default DisplayData;
