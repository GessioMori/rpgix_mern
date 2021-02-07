import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "./../../Auth/Input";

import { Grid, Button, Typography } from "@material-ui/core";
import Errors from "./Errors";

import { enterGroup } from "./../../../actions/groups";

import useStyles from "./styles";

const initialFormState = {
  code: "",
};

const EnterGroup = () => {
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
    dispatch(enterGroup(formData));
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setFormData(initialFormState);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <Errors />
      <Typography variant="h5" className={classes.title} align="center">
        Entre em um grupo
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input
            name="code"
            label="Código do grupo"
            handleChange={handleChange}
          />
        </Grid>
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Entrar em um grupo
        </Button>
      </form>
    </Grid>
  );
};

export default EnterGroup;
