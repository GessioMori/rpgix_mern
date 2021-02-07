import React from "react";

import { Typography, Paper, Grid, Button } from "@material-ui/core/";

import useStyles from "./styles";

import mockImage from "./../../../images/bg1login.jpeg";

const GroupCard = ({ group, user }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Button className={classes.button} href={`/dashboard/group/${group._id}`}>
        <Grid
          item
          xs={12}
          component={Paper}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${
              group.image || mockImage
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            margin: "0.5rem",
            height: "150px",
            position: "relative",
            textTransform: "none",
          }}
        >
          <div className={classes.title}>
            <Typography variant="h5">{group.title}</Typography>
            <Typography>{`(${group.code})`}</Typography>
          </div>
        </Grid>
      </Button>
      {group.master === user.result._id && (
        <Grid container className={classes.masterButton}>
          <Button
            color="secondary"
            href={`/dashboard/managegroup/${group._id}`}
          >
            Gerenciar grupo
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default GroupCard;
