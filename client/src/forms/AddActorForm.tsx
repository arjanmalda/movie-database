import { Button, FormControl, IconButton, TextField } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
const AddActorForm = ({
  moviesRefetch,
  actorsRefetch,
  setActorName,
  actorName,
  nationality,
  actorImage,
  setNationality,
  setActorImage,
  addActor,
  actorChangeForm,
  setActorChangeForm,
}: any) => {
  return (
    <div className="actor-form">
      <FormControl>
        Add a new actor to the list
        <IconButton
          onClick={() => {
            setActorChangeForm(false);
            console.log(actorChangeForm);
          }}
          className="movie-delete-icon"
        >
          <ArrowForwardRoundedIcon />
        </IconButton>
        <TextField
          label="Actor name"
          variant="standard"
          type="text"
          placeholder="Tom Cruise"
          onChange={(event) => {
            setActorName(event.target.value);
          }}
        />
        <TextField
          variant="standard"
          type="text"
          label="Nationality"
          placeholder="American"
          onChange={(event) => {
            setNationality(event.target.value);
          }}
        />
        <TextField
          variant="standard"
          className="text-field"
          type="text"
          color="primary"
          label="Image"
          placeholder="https://image.png"
          onChange={(event) => {
            setActorImage(event.target.value);
          }}
        />
        <br></br>
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
                  input: {
                    actor: actorName,
                    nationality: nationality,
                    image: actorImage,
                  },
                },
              });

              moviesRefetch();
              actorsRefetch();
            }}
          >
            Add actor
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default AddActorForm;
