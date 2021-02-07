import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import useStyles from "./styles";

import { deletePage } from "../../../../api/index";
import { getGroup } from "../../../../actions/groups";

const buttonTheme = createMuiTheme({
  palette: { primary: { main: "#4791db" }, secondary: { main: "#dc004e" } },
});

const JournalPage = ({ charId, page, isOwner, index }) => {
  const dispatch = useDispatch();
  const groupId = useParams().id;

  const classes = useStyles();
  const [askDelete, setAskDelete] = useState(false);

  const askToDeletePage = () => {
    setAskDelete(true);
  };

  const confirmDelete = (idToDelete) => {
    let pageInfo = { charId, pageId: idToDelete };
    deletePage(pageInfo)
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
              {`Página ${index}`}&nbsp;&nbsp;
            </Typography>
            <Typography className={classes.titleSec}>
              {moment(page.date).format("DD/MM/YY")}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Typography className={classes.content}>{page.content}</Typography>
          </Grid>
        </AccordionDetails>
        {isOwner && (
          <AccordionActions>
            <MuiThemeProvider theme={buttonTheme}>
              {askDelete ? (
                <>
                  <Typography>Você tem certeza?</Typography>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => confirmDelete(page._id)}
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
                  onClick={() => askToDeletePage()}
                >
                  Excluir
                </Button>
              )}
            </MuiThemeProvider>
          </AccordionActions>
        )}
      </Accordion>
    </div>
  );
};

export default JournalPage;
