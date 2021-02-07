import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Grid, Paper, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import AvatarGenerator from "./AvatarGenerator/AvatarGenerator";
import CharForm from "./CharForm/CharForm";
import AttributesForm from "./AttributesForm/AttributesForm";

import useStyles from "./styles";

import { createChar } from "./../../../../api/index";
import { getGroup } from "./../../../../actions/groups";

import { useSelector } from "react-redux";

const CharGenerator = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem("profile")), []);
  const group = useSelector((state) => state.currentGroupReducer.currentGroup);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [newAvatar, setNewAvatar] = useState({
    topType: "",
    hairColor: "",
    accessoriesType: "",
    hatColor: "",
    facialHairType: "",
    facialHairColor: "",
    clotheType: "CollarSweater",
    clotheColor: "",
    eyeType: "",
    eyebrowType: "",
    mouthType: "",
    skinColor: "",
  });
  const [newCharForm, setNewCharForm] = useState({
    badTraits: "",
    excelentTraits: "",
    goodTraits: "",
    name: "",
    race: "",
    charClass: "",
  });
  const [newAttributesForm, setNewAttributesForm] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const avatarCallback = useCallback((avatar) => {
    setNewAvatar(avatar);
  }, []);

  const formCallback = useCallback((form) => {
    setNewCharForm(form);
  }, []);

  const attributesCallback = useCallback((att) => {
    setNewAttributesForm(att);
  }, []);

  const sendForm = () => {
    if (
      !newCharForm.badTraits ||
      !newCharForm.excelentTraits ||
      !newCharForm.goodTraits ||
      !newCharForm.name ||
      !newCharForm.race ||
      !newCharForm.charClass ||
      newAttributesForm.reduce((a, b) => a + b) !== 30
    ) {
      setError("Incomplete form");
    } else {
      setError("");
      let charData = {
        userName: user.result.name,
        name: newCharForm.name,
        race: newCharForm.race,
        charClass: newCharForm.charClass,
        avatar: newAvatar,
        attributes: newAttributesForm,
        goodTraits: newCharForm.goodTraits,
        badTraits: newCharForm.badTraits,
        excelentTraits: newCharForm.excelentTraits,
      };
      createChar(charData, group.group._id)
        .then(() => dispatch(getGroup(group.group._id)))
        .catch((err) => setError(err.response.data.message));
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={5} component={Paper} className={classes.paper}>
        <AvatarGenerator parentCallback={avatarCallback} />
      </Grid>
      <Grid item xs={12} md={5} component={Paper} className={classes.paper}>
        <CharForm parentCallback={formCallback} />
        <AttributesForm parentCallback={attributesCallback} />
        {error === "Incomplete form" ? (
          <Grid item xs={12}>
            <Alert severity="error" variant="filled" className={classes.alert}>
              Você precisa preencher todo formulário e usar todos seus pontos de
              atributos.
            </Alert>
          </Grid>
        ) : null}
        {error === "Name is already taken" ? (
          <Grid item xs={12}>
            <Alert
              severity="warning"
              variant="filled"
              className={classes.alert}
            >
              Já existe um personagem com esse nome!
            </Alert>
          </Grid>
        ) : null}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={sendForm}
        >
          Criar personagem
        </Button>
      </Grid>
    </Grid>
  );
};

export default CharGenerator;
