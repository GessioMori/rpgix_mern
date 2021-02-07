import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { createPage } from "./../../../../../api/index";
import { getGroup } from "./../../../../../actions/groups";

import useStyles from "./styles";

const CreatePage = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const groupId = character.group;
  const charId = character._id;
  const [error, setError] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    createPage({ content, groupId, charId })
      .then(() => {
        dispatch(getGroup(groupId));
        Array.from(document.querySelectorAll("textarea")).forEach(
          (input) => (input.value = "")
        );
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <Grid container className={classes.root}>
      {error && (
        <Grid item xs={12} className={classes.alertGrid}>
          <Alert severity="error" variant="filled" className={classes.alert}>
            Algo deu errado, tente novamente.
          </Alert>
        </Grid>
      )}
      <Typography variant="h5" className={classes.title} align="center">
        Crie uma página do diário
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="content"
          onChange={handleChange}
          color="secondary"
          variant="outlined"
          required
          fullWidth
          label="Conteúdo"
          type="text"
          multiline
          className={classes.input}
        />
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Criar página
        </Button>
      </form>
    </Grid>
  );
};

export default CreatePage;
