import React, { useState } from "react";

import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
} from "@material-ui/core";

import useStyles from "./styles";

import JournalPage from "../JournalPage/JournalPage";

const MasterJournal = ({ group }) => {
  const classes = useStyles();
  const [character, setCharacter] = useState(
    group.characters.length ? group.characters[0] : ""
  );

  const handleChange = (e) => setCharacter(e.target.value);
  return (
    <Grid container className={classes.root}>
      <Grid component={Paper} className={classes.journals}>
        {!group.characters.length ? (
          <Typography variant="h5" className={classes.noChar}>
            Não há nenhum personagem criado para publicar no diário!
          </Typography>
        ) : (
          <>
            <Grid item>
              <FormControl
                variant="outlined"
                color="secondary"
                className={classes.formControl}
              >
                <InputLabel id="input-label">Personagem</InputLabel>
                <Select
                  value={character}
                  onChange={handleChange}
                  label="Personagem"
                >
                  {group.characters.map((character) => (
                    <MenuItem key={Math.random()} value={character}>
                      {`${character.name}  (${character.userName})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container className={classes.pages}>
              {character.journal.length ? (
                character.journal
                  .reverse()
                  .map((page, index) => (
                    <JournalPage
                      charId={character._id}
                      page={page}
                      index={character.journal.length - index}
                      userId={"none"}
                      isOwner={false}
                      key={`page${Math.random()}`}
                    />
                  ))
              ) : (
                <Typography variant="h5" className={classes.noChar}>
                  Não há publicações no diário desse personagem!
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default MasterJournal;
