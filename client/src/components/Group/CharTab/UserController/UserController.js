import React from "react";

import { Grid } from "@material-ui/core";

import OwnerAccordion from "./../OwnerAccordion/OwnerAccordion";
import CharAccordion from "./../CharAccordion/CharAccordion";

import useStyles from "./styles";

const UserController = ({ group }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Grid container className={classes.root}>
      {group.characters.map((character, index) => {
        if (user.result._id === character.user) {
          return <OwnerAccordion key={index} character={character} />;
        }
        return null;
      })}
      {group.characters.map((character, index) => {
        if (user.result._id !== character.user) {
          return <CharAccordion key={index} character={character} />;
        }
        return null;
      })}
    </Grid>
  );
};

export default UserController;
