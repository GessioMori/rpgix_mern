import React from "react";

import { Grid, Typography, Paper } from "@material-ui/core";

import MasterAccordion from "./../MasterAccordion/MasterAcoordion";

import useStyles from "./styles";

const MasterController = ({ group }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {group.characters.length ? (
        group.characters.map((character) => (
          <MasterAccordion key={Math.random()} character={character} />
        ))
      ) : (
        <Grid container component={Paper}>
          <Typography variant="h5" className={classes.noChar}>
            Não há nenhum personagem no grupo!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MasterController;
