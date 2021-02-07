import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import FileBase from "react-file-base64";

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { createChapter } from "./../../../../api/index";
import { getGroup } from "./../../../../actions/groups";

import useStyles from "./styles";

const CreateChapter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const groupId = useParams().id;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const kbSize = new Blob([formData.image]).size / 1024 / 1.3;
    if (kbSize > 200) {
      setError("max size");
    } else {
      setError("");

      createChapter({ ...formData }, groupId)
        .then(() => {
          dispatch(getGroup(groupId));
          Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
          );
          Array.from(document.querySelectorAll("textarea")).forEach(
            (input) => (input.value = "")
          );
        })
        .catch((err) => setError(err.response.data.message));
    }
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
        Crie um capítulo
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="title"
          onChange={handleChange}
          color="secondary"
          variant="outlined"
          required
          fullWidth
          label="Título"
          type="text"
          className={classes.input}
        />
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

        <Typography variant="body1" className={classes.title}>
          Escolha uma imagem para o capítulo (tamanho máximo: 200 kB):
        </Typography>

        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => {
            setFormData({ ...formData, image: base64 });
          }}
        />

        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Criar capítulo
        </Button>
      </form>
    </Grid>
  );
};

export default CreateChapter;
