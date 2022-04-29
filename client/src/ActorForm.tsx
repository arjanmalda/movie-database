import { Button, FormControl, TextField } from "@mui/material";

const ActorForm = ({
  moviesRefetch,
  actorsRefetch,
  setActorName,
  actorName,
  nationality,
  actorImage,
  setNationality,
  setActorImage,
  addActor,
}: any) => {
  return (
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
            Add new actor
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default ActorForm;
