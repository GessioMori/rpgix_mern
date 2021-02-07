import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Grid, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";

import { deleteChar } from "../../../../api/index";
import { getGroup } from "./../../../../actions/groups";

const CharItem = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [askDelete, setAskDelete] = useState(false);

  const askToDelete = () => {
    setAskDelete(true);
  };

  const confirmDelete = () => {
    deleteChar(character.group, { charId: character._id }).then(() =>
      dispatch(getGroup(character.group))
    );
  };

  const cancelDelete = () => {
    setAskDelete(false);
  };
  return (
    <Grid item className={classes.charItem}>
      <Typography
        className={classes.charName}
      >{`${character.name} (${character.userName})`}</Typography>
      {askDelete ? (
        <div className={classes.confirmDiv}>
          <Typography className={classes.confirmText}>
            Apagar personagem?
          </Typography>
          <Button size="small" color="secondary" onClick={confirmDelete}>
            Sim
          </Button>
          <Button size="small" color="primary" onClick={cancelDelete}>
            Não
          </Button>
        </div>
      ) : (
        <Button
          color="secondary"
          className={classes.deleteButton}
          onClick={askToDelete}
        >
          X
        </Button>
      )}
    </Grid>
  );
};

export default CharItem;
