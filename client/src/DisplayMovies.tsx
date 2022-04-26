import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

interface Movie {
  id: string | undefined;
  movie: string | undefined;
  duration: string | undefined;
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

const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: AddMovieInput!) {
    addMovie(input: $input) {
      movie
      duration
    }
  }
`;

function DisplayData() {
  const [movieName, setMovieName] = useState("");
  const [duration, setDuration] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_MOVIES);

  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);

  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
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

        <button
          onClick={() => {
            addMovie({
              variables: {
                input: { movie: movieName, duration: duration },
              },
            });

            refetch();
          }}
        >
          Add movie
        </button>
      </div>

      {data &&
        data.movies.map((movie: Movie) => {
          return (
            <div key={movie.id}>
              <h1>Movie: {movie.movie}</h1>
              <h3>Duration: {movie.duration}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default DisplayData;
