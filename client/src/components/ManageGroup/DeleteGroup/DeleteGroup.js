import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";

import { deleteGroup } from "./../../../api/index";

import useStyles from "./styles";

const DeleteGroup = () => {
  const [askDelete, setAskDelete] = useState(false);
  const group = useSelector((state) => state.currentGroupReducer.currentGroup);
  const classes = useStyles();
  const history = useHistory();

  const askToDelete = () => {
    setAskDelete(true);
  };

  const confirmDelete = () => {
    deleteGroup(group.group._id).then(() => history.push("/dashboard"));
  };

  const cancelDelete = () => {
    setAskDelete(false);
  };

  return (
    <Grid container className={classes.root} component={Paper}>
      {!group ? (
        <div style={{ textAlign: "center", padding: "2em" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {askDelete ? (
            <Grid container className={classes.confirmDiv}>
              <Typography className={classes.confirmText}>
                Tem certeza que deseja apagar o grupo?
              </Typography>
              <Button size="small" color="secondary" onClick={confirmDelete}>
                Sim
              </Button>
              <Button size="small" color="primary" onClick={cancelDelete}>
                Não
              </Button>
            </Grid>
          ) : (
            <Button
              color="secondary"
              className={classes.deleteButton}
              onClick={askToDelete}
            >
              Apagar o grupo
            </Button>
          )}
        </>
      )}
    </Grid>
  );
};

export default DeleteGroup;
