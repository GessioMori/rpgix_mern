import React from "react";

import CreatePage from "./CreatePage/CreatePage";
import JournalPage from "../JournalPage/JournalPage";

import { Grid, Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

const UserJournal = ({ group }) => {
  const classes = useStyles();

  const character = group.characters.filter((character) =>
    character?.journal ? character : null
  )[0];
  return (
    <Grid container className={classes.root}>
      {!character ? (
        <Grid item xs={12} component={Paper} className={classes.pages}>
          <Typography variant="h5" className={classes.noPage}>
            Você precisa criar um personagem para acessar o diário!
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid
            item
            xs={12}
            md={5}
            component={Paper}
            className={classes.pageForm}
          >
            <CreatePage character={character} />
          </Grid>
          <Grid item xs={12} md={6} component={Paper} className={classes.pages}>
            {character.journal.length ? (
              character.journal
                .reverse()
                .map((page, index) => (
                  <JournalPage
                    charId={character._id}
                    page={page}
                    index={character.journal.length - index}
                    isOwner={true}
                    key={`page${Math.random()}`}
                  />
                ))
            ) : (
              <Typography variant="h5" className={classes.noPage}>
                Não há publicações no diário!
              </Typography>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserJournal;
