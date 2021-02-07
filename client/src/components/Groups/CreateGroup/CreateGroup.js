import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FileBase from "react-file-base64";
import Input from "./../../Auth/Input";

import { Grid, Button, Typography } from "@material-ui/core";
import Errors from "./Errors";

import { createGroup } from "./../../../actions/groups";

import useStyles from "./styles";

const initialFormState = {
  title: "",
  code: "",
  master: "",
  image: "",
};

const CreateGroup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
  const classes = useStyles();

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createGroup(formData));
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setFormData(initialFormState);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Errors />
      <Typography variant="h5" className={classes.title} align="center">
        Crie um grupo
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input
            name="title"
            label="Título do grupo"
            handleChange={handleChange}
          />
          <Input
            name="code"
            label="Código para entrar no grupo"
            handleChange={handleChange}
          />
        </Grid>
        <div style={{ marginTop: "1em" }}>
          <Typography variant="body1" className={classes.title}>
            Escolha uma imagem para o grupo:
          </Typography>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setFormData({ ...formData, image: base64 });
            }}
          />
        </div>
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Criar grupo
        </Button>
      </form>
    </Grid>
  );
};

export default CreateGroup;
