import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Grid, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";

import { banUser } from "../../../../api/index";
import { getGroup } from "./../../../../actions/groups";

const UserItem = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [askDelete, setAskDelete] = useState(false);

  const askToDelete = () => {
    setAskDelete(true);
  };

  const confirmDelete = () => {
    banUser(character.group, { charId: character._id }).then(() =>
      dispatch(getGroup(character.group))
    );
  };

  const cancelDelete = () => {
    setAskDelete(false);
  };
  return (
    <Grid item className={classes.userItem}>
      <Typography className={classes.charName}>{character.userName}</Typography>
      {askDelete ? (
        <div className={classes.confirmDiv}>
          <Typography className={classes.confirmText}>
            Banir jogador?
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

export default UserItem;
