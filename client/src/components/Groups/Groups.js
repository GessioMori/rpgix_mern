import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { Grid, Paper, CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./styles";

import GroupCard from "./GroupCard/GroupCard";
import CreateGroup from "./CreateGroup/CreateGroup";
import EnterGroup from "./EnterGroup/EnterGroup";

import { getGroups } from "./../../api/index";

const Groups = () => {
  const classes = useStyles();
  const user = useMemo(() => JSON.parse(localStorage.getItem("profile")), []);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const groupCreated = useSelector((state) => state?.groupCreatorReducer);
  const groupEntered = useSelector((state) => state?.groupEnterReducer);

  useEffect(() => {
    getGroups().then((res) => {
      if (res.data.length) {
        setGroups(res.data);
      }
      setLoading(false);
    });
  }, [user, groupCreated, groupEntered]);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        component={Paper}
        className={classes.paper}
        xs={12}
        md={6}
        lg={7}
      >
        <Grid className={classes.container} container>
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : groups.length ? (
            groups.map((group) => (
              <GroupCard key={group._id} group={group} user={user} />
            ))
          ) : (
            <Typography variant="h5" className={classes.loading}>
              Você precisa entrar em um grupo ou criar um!
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid item component={Paper} className={classes.paper}>
          <EnterGroup />
        </Grid>
        <Grid item component={Paper} className={classes.paper}>
          <CreateGroup />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Groups;
