import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const ChangeActorForm = ({
  moviesRefetch,
  actorsRefetch,
  setActorName,
  actorName,
  nationality,
  actorImage,
  setNationality,
  setActorImage,
  setActorChangeForm,
  changeActor,
  changeActorLoading,
}: any) => {
  return (
    <div className="actor-form">
      <FormControl>
        Change an existing actor
        <IconButton
          onClick={() => {
            setActorChangeForm(true);
          }}
          className="movie-delete-icon"
        >
          <ArrowBackRoundedIcon />
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
          {changeActorLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => {
                changeActor({
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
              Change actor
            </Button>
          )}
        </div>
      </FormControl>
    </div>
  );
};

export default ChangeActorForm;
