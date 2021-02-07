import React from "react";
import { useSelector } from "react-redux";

import { Grid, Typography, Paper } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

import CharItem from "./CharItem/CharItem";

import useStyles from "./styles";

const ManageChars = () => {
  const group = useSelector((state) => state.currentGroupReducer.currentGroup);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} component={Paper}>
      {!group ? (
        <div style={{ textAlign: "center", padding: "2em" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h5" className={classes.title}>
            Apagar personagem
          </Typography>
          <Grid container className={classes.charList}>
            {group.characters.map((character) => (
              <CharItem character={character} key={character._id} />
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ManageChars;
