import { CloseRounded } from "@mui/icons-material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Actor, Movie } from "../DisplayData";

const AddMovieForm = ({
  addMovie,

  moviesRefetch,
  actorsRefetch,
  setMovieName,
  setDuration,
  setMovieImage,
  setActorName,
  actorData,
  movieName,
  duration,
  movieImage,
  actorName,

  setMovieChangeForm,
  addMovieLoading,
}: any) => {
  return (
    <div className="movie-form">
      <FormControl>
        Add a new movie
        <IconButton
          onClick={() => {
            setMovieChangeForm(true);
          }}
          className="movie-delete-icon"
        >
          <ArrowForwardRoundedIcon />
        </IconButton>
        <TextField
          label="Movie name"
          variant="standard"
          type="text"
          placeholder="For example... Titanic 🚢"
          onChange={(event) => {
            setMovieName(event.target.value);
          }}
        />
        <TextField
          variant="standard"
          className="text-field"
          type="text"
          color="primary"
          placeholder="00:00h"
          label="Duration"
          onChange={(event) => {
            setDuration(event.target.value);
          }}
        />
        <TextField
          variant="standard"
          className="text-field"
          type="text"
          color="primary"
          placeholder="https://image.png"
          label="Paste an image url"
          onChange={(event) => {
            setMovieImage(event.target.value);
          }}
        />
        <br></br>
        Select an actor from the list
        <Select
          defaultValue={"Actor"}
          variant="filled"
          inputProps={{
            name: "select actor",
            id: "uncontrolled-native",
          }}
          className="select-input"
          label="Actor"
          placeholder="Select an actor"
          helper-text="Please enter your name"
          onChange={(event) => {
            event.preventDefault();
            setActorName(event.target.value);
            console.log(actorName);
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
          {addMovieLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => {
                addMovie({
                  variables: {
                    movieInput: {
                      movie: movieName,
                      duration: duration,
                      image: movieImage,
                      actor: actorName,
                    },
                  },
                });

                moviesRefetch();
                actorsRefetch();
              }}
            >
              Add Movie
            </Button>
          )}
        </div>
      </FormControl>
    </div>
  );
};

export default AddMovieForm;
