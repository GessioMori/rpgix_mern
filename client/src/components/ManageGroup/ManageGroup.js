import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getGroup } from "../../actions/groups";

import { Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ManageChars from "./ManageChars/ManageChars";
import ManageUsers from "./ManageUsers/ManageUsers";
import DeleteGroup from "./DeleteGroup/DeleteGroup";

import useStyles from "./styles";

const buttonTheme = createMuiTheme({
  palette: { primary: { main: "#4791db" }, secondary: { main: "#dc004e" } },
});

const ManageGroup = () => {
  const groupId = useParams().id;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getGroup(groupId));
  }, [dispatch, groupId]);

  return (
    <Grid container className={classes.root}>
      <MuiThemeProvider theme={buttonTheme}>
        <Grid item xs={12} md={6} className={classes.item}>
          <ManageChars />
        </Grid>
        <Grid item xs={12} md={5} className={classes.item}>
          <ManageUsers />
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <DeleteGroup />
        </Grid>
      </MuiThemeProvider>
    </Grid>
  );
};

export default ManageGroup;
