import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";

import useStyles from "./styles";

const CharForm = ({ parentCallback }) => {
  const classes = useStyles();

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    parentCallback(form);
  }, [form, parentCallback]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Escolha as características do seu personagem
      </Typography>
      <Grid container>
        <TextField
          name="name"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Nome do personagem"
          type="text"
          className={classes.textField}
          color="secondary"
        />
        <TextField
          name="race"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Raça do personagem"
          type="text"
          className={classes.textField}
          color="secondary"
        />
        <TextField
          name="charClass"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Classe do personagem"
          type="text"
          className={classes.textField}
          color="secondary"
        />
        <TextField
          name="goodTraits"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Características positivas"
          type="text"
          multiline
          className={classes.textField}
          color="secondary"
        />
        <TextField
          name="badTraits"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Características negativas"
          type="text"
          multiline
          className={classes.textField}
          color="secondary"
        />
        <TextField
          name="excelentTraits"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Habilidades"
          type="text"
          multiline
          className={classes.textField}
          color="secondary"
        />
      </Grid>
    </div>
  );
};

export default React.memo(CharForm);
