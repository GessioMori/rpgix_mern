import React from "react";
import { useSelector } from "react-redux";

import { Grid, Paper, Typography, CircularProgress } from "@material-ui/core";

import CreateChapter from "./CreateChapter/CreateChapter";
import Chapter from "./Chapter/Chapter";

import useStyles from "./styles";

const StoryTab = () => {
  const group = useSelector((state) => state.currentGroupReducer.currentGroup);
  const classes = useStyles();
  const chaptersGrid = group?.isMaster ? 6 : 12;

  return !group ? (
    <div style={{ textAlign: "center", padding: "2em" }}>
      <CircularProgress />
    </div>
  ) : (
    <Grid container className={classes.root}>
      {group?.isMaster && (
        <Grid
          item
          xs={12}
          md={5}
          component={Paper}
          className={classes.chapterForm}
        >
          <CreateChapter />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={chaptersGrid}
        component={Paper}
        className={classes.chapters}
      >
        {group.group.chapters.length ? (
          group.group.chapters.map((element, index) => (
            <Chapter
              key={index}
              chapter={element}
              index={index}
              isMaster={group?.isMaster}
            />
          ))
        ) : (
          <Typography variant="h5" className={classes.noChapter}>
            Não há capítulos publicados!
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default StoryTab;
