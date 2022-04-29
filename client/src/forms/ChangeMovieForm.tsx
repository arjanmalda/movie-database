import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import React from "react";
import { Actor, Movie } from "../DisplayData";

const ChangeMovieForm = ({
  addMovie,
  linkActor,
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
  nationality,
  actorImage,
  movieChangeForm,
  setMovieChangeForm,
  changeMovie,
}: any) => {
  return (
    <div className="movie-form">
      <FormControl>
        Add a new movie
        <IconButton
          onClick={() => {
            setMovieChangeForm(false);
            console.log(movieChangeForm);
          }}
          className="movie-delete-icon"
        >
          <ArrowBackRoundedIcon />
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
          placeholder="Https://image.png"
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
              changeMovie({
                variables: {
                  input: {
                    movie: movieName,
                    duration: duration,
                    image: movieImage,
                  },
                },
              });

              moviesRefetch();
              actorsRefetch();
            }}
          >
            Save Movie
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default ChangeMovieForm;
