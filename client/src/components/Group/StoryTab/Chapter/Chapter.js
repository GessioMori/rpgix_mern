import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Paper,
  Button,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import useStyles from "./styles";

import { deleteChapter } from "./../../../../api/index";
import { getGroup } from "./../../../../actions/groups";

const buttonTheme = createMuiTheme({
  palette: { primary: { main: "#4791db" }, secondary: { main: "#dc004e" } },
});

const Chapter = ({ chapter, index, isMaster }) => {
  const dispatch = useDispatch();
  const groupId = useParams().id;
  const classes = useStyles();
  const [askDelete, setAskDelete] = useState(false);

  const askToDeleteChapter = () => {
    setAskDelete(true);
  };

  const confirmDelete = (idToDelete) => {
    let chapterInfo = { chapterId: idToDelete };
    deleteChapter(chapterInfo, groupId)
      .then(() => dispatch(getGroup(groupId)))
      .catch((err) => console.log(err));
  };

  const cancelDelete = () => {
    setAskDelete(false);
  };

  return (
    <div>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.accordionSummary}
        >
          <div>
            <Typography className={classes.titleMain}>
              {`Capítulo ${index + 1}:`}&nbsp;&nbsp;
            </Typography>
            <Typography className={classes.titleSec}>
              {chapter.title}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container style={{ justifyContent: "center" }}>
            {chapter?.image && (
              <Grid
                item
                xs={12}
                component={Paper}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${chapter.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  margin: "0.5rem",
                  height: "20rem",
                  maxWidth: "600px",
                  position: "relative",
                }}
              ></Grid>
            )}
            <Typography className={classes.content}>
              {chapter.content}
            </Typography>
          </Grid>
        </AccordionDetails>
        {isMaster && (
          <AccordionActions>
            <MuiThemeProvider theme={buttonTheme}>
              {askDelete ? (
                <>
                  <Typography>Você tem certeza?</Typography>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => confirmDelete(chapter._id)}
                  >
                    Sim
                  </Button>
                  <Button size="small" color="primary" onClick={cancelDelete}>
                    Não
                  </Button>
                </>
              ) : (
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => askToDeleteChapter(chapter._id)}
                >
                  Excluir capítulo
                </Button>
              )}
            </MuiThemeProvider>
          </AccordionActions>
        )}
      </Accordion>
    </div>
  );
};

export default Chapter;
