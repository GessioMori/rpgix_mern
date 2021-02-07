import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "awesome-react-avataaars-multiple";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./styles";

import { getGroup } from "./../../../../actions/groups";
import { userEditCharacter } from "./../../../../api/index";

const buttonTheme = createMuiTheme({
  palette: { primary: { main: "#4791db" }, secondary: { main: "#dc004e" } },
});

const inputTheme = createMuiTheme({
  palette: { primary: { main: "#00695f" } },
});

const OwnerAccordion = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(false);
  const [formData, setFormData] = useState({
    goodTraits: character.goodTraits,
    badTraits: character.badTraits,
    excelentTraits: character.excelentTraits,
  });
  const [attributes, setAttributes] = useState(character.attributes);

  const maxAttributes = 30 + (character.level - 1) * 2;
  const [avaiablePoints, setAvaiablePoints] = useState(
    maxAttributes - character.attributes.reduce((a, b) => a + b)
  );
  const [buttonDisabled, setButtonDisabled] = useState([
    [true, avaiablePoints ? false : true],
    [true, avaiablePoints ? false : true],
    [true, avaiablePoints ? false : true],
    [true, avaiablePoints ? false : true],
    [true, avaiablePoints ? false : true],
    [true, avaiablePoints ? false : true],
  ]);
  const [error, setError] = useState("");

  const submitChanges = () => {
    let prevButtonDisabled = [...buttonDisabled];
    if (
      !formData.goodTraits ||
      !formData.badTraits ||
      !formData.excelentTraits ||
      avaiablePoints
    ) {
      setError("Incomplete form");
    } else {
      setError("");
      let editData = {
        ...formData,
        attributes,
        charId: character._id,
      };

      userEditCharacter(editData)
        .then(() => {
          dispatch(getGroup(character.group));
          setEditor(false);
          for (let i = 0; i < 6; i++) {
            prevButtonDisabled[i][0] = true;
          }
          setButtonDisabled(prevButtonDisabled);
        })
        .catch((error) => console.log(error));
    }
  };

  const cancelChanges = () => {
    setFormData({
      goodTraits: character.goodTraits,
      badTraits: character.badTraits,
      excelentTraits: character.excelentTraits,
    });
    setEditor(false);
    setError("");
    setAvaiablePoints(
      maxAttributes - character.attributes.reduce((a, b) => a + b)
    );
    setAttributes(character.attributes);
    let prevButtonDisabled = [...buttonDisabled];
    for (let i = 0; i < 6; i++) {
      prevButtonDisabled[i][0] = true;
      if (maxAttributes - character.attributes.reduce((a, b) => a + b)) {
        prevButtonDisabled[i][1] = false;
      }
    }
    setButtonDisabled(prevButtonDisabled);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAttributeChange = (index, amount) => {
    let prevAttributesArray = [...attributes];
    let prevButtonDisabled = [...buttonDisabled];
    prevAttributesArray[index] += amount;
    let sumOfAttributes = prevAttributesArray.reduce((a, b) => a + b);
    setAvaiablePoints(maxAttributes - sumOfAttributes);
    setAttributes(prevAttributesArray);
    if (sumOfAttributes >= maxAttributes) {
      prevButtonDisabled.forEach(
        (element, index) => (prevButtonDisabled[index][1] = true)
      );
    }
    if (sumOfAttributes < maxAttributes) {
      prevButtonDisabled.forEach(
        (element, index) => (prevButtonDisabled[index][1] = false)
      );
    }
    prevAttributesArray.forEach((element, index) =>
      element <= character.attributes[index]
        ? (prevButtonDisabled[index][0] = true)
        : (prevButtonDisabled[index][0] = false)
    );
    setButtonDisabled(prevButtonDisabled);
  };

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Grid container className={classes.root}>
        <Accordion className={classes.accordion} defaultExpanded>
          <AccordionSummary
            className={classes.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <div>
              <Typography className={classes.titleMain}>
                {character.name}&nbsp;&nbsp;
              </Typography>
              <Typography className={classes.titleSec}>
                {`(${character.userName})`}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container className={classes.details}>
              {!editor ? (
                <>
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    md={3}
                    className={classes.detailsBlockAvatar}
                  >
                    <Avatar
                      style={{ width: "90%" }}
                      avatarStyle="Circle"
                      accessoriesType={character.avatar.accessoriesType}
                      clotheColor={character.avatar.clotheColor}
                      clotheType={character.avatar.clotheType}
                      eyeType={character.avatar.eyeType}
                      eyebrowType={character.avatar.eyebrowType}
                      facialHairColor={character.avatar.facialHairColor}
                      facialHairType={character.avatar.facialHairType}
                      hairColor={character.avatar.hairColor}
                      hatColor={character.avatar.hatColor}
                      mouthType={character.avatar.mouthType}
                      skinColor={character.avatar.skinColor}
                      topType={character.avatar.topType}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    md={3}
                    className={classes.detailsBlock}
                  >
                    <div>
                      <Typography className={classes.typoMain}>
                        Nível:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.level}
                      </Typography>
                    </div>
                    <div>
                      <Typography className={classes.typoMain}>
                        Raça:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.race}
                      </Typography>
                    </div>
                    <div>
                      <Typography className={classes.typoMain}>
                        Classe:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.charClass}
                      </Typography>
                    </div>
                    <div>
                      <Typography className={classes.typoMain}>
                        Pontos de vida:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.life}
                      </Typography>
                    </div>

                    <Typography className={classes.typoMain}>
                      Atributos:
                    </Typography>
                    {[
                      "Força",
                      "Destreza",
                      "Constituição",
                      "Inteligência",
                      "Sabedoria",
                      "Carisma",
                    ].map((element, index) => (
                      <Typography key={index}>
                        &nbsp;&nbsp;&nbsp;
                        {`${element}: ${character.attributes[index]}`}
                      </Typography>
                    ))}

                    <div>
                      <Typography className={classes.typoMain}>
                        Items:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.items.join(", ")}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} className={classes.detailsBlock}>
                    <div>
                      <Typography className={classes.typoMain}>
                        Características positivas:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.goodTraits}
                      </Typography>
                    </div>
                    <div>
                      <Typography className={classes.typoMain}>
                        Características negativas:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.badTraits}
                      </Typography>
                    </div>
                    <div>
                      <Typography className={classes.typoMain}>
                        Habilidades:&nbsp;
                      </Typography>
                      <Typography className={classes.typoSec}>
                        {character.excelentTraits}
                      </Typography>
                    </div>
                  </Grid>
                </>
              ) : (
                <>
                  {error === "Incomplete form" ? (
                    <Grid item xs={12}>
                      <Alert
                        severity="error"
                        variant="filled"
                        className={classes.alert}
                      >
                        Você precisa preencher todo formulário e usar todos seus
                        pontos de atributos.
                      </Alert>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={5} className={classes.detailsBlock}>
                    <Typography className={classes.editMain}>
                      Mudar características do personagem:
                    </Typography>
                    <Grid container className={classes.gridAlign}>
                      <MuiThemeProvider theme={inputTheme}>
                        <TextField
                          name="goodTraits"
                          value={formData.goodTraits}
                          label="Características positivas"
                          variant="outlined"
                          color="primary"
                          className={classes.input}
                          onChange={handleChange}
                          multiline
                        />
                        <TextField
                          name="badTraits"
                          value={formData.badTraits}
                          label="Características negativas"
                          variant="outlined"
                          color="primary"
                          className={classes.input}
                          onChange={handleChange}
                          multiline
                        />
                        <TextField
                          name="excelentTraits"
                          value={formData.excelentTraits}
                          label="Habilidades"
                          variant="outlined"
                          color="primary"
                          className={classes.input}
                          onChange={handleChange}
                          multiline
                        />
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5} className={classes.detailsBlock}>
                    <Typography className={classes.editMain}>
                      Melhorar os atributos:
                    </Typography>
                    <MuiThemeProvider theme={buttonTheme}>
                      <Grid
                        item
                        className={`${classes.attributeText} ${classes.avaiable}`}
                      >
                        <Typography variant="body1">{`Pontos disponíveis: ${avaiablePoints}`}</Typography>
                      </Grid>
                      {[
                        "Força",
                        "Destreza",
                        "Constituição",
                        "Inteligência",
                        "Sabedoria",
                        "Carisma",
                      ].map((element, index) => (
                        <Grid
                          container
                          key={element}
                          className={classes.attribute}
                        >
                          <Button
                            className={classes.button}
                            onClick={() => {
                              handleAttributeChange(index, -1);
                            }}
                            disabled={buttonDisabled[index][0]}
                            variant="contained"
                            color="secondary"
                          >
                            <Typography className={classes.signIconNegative}>
                              {" "}
                              -
                            </Typography>
                          </Button>
                          <Button
                            className={classes.button}
                            onClick={() => {
                              handleAttributeChange(index, 1);
                            }}
                            disabled={buttonDisabled[index][1]}
                            variant="contained"
                            color="primary"
                          >
                            <Typography className={classes.signIconPositive}>
                              +
                            </Typography>
                          </Button>
                          <Grid item className={classes.attributeText}>
                            <Typography variant="body1">{`${element}: ${attributes[index]}`}</Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </MuiThemeProvider>
                  </Grid>
                </>
              )}
            </Grid>
          </AccordionDetails>
          <AccordionActions>
            {!editor ? (
              <Button
                size="small"
                color="primary"
                onClick={() => setEditor(true)}
              >
                Editar personagem
              </Button>
            ) : (
              <>
                <Button size="small" onClick={cancelChanges} color="secondary">
                  Cancelar
                </Button>
                <Button size="small" color="primary" onClick={submitChanges}>
                  Salvar
                </Button>
              </>
            )}
          </AccordionActions>
        </Accordion>
      </Grid>
    </MuiThemeProvider>
  );
};

export default OwnerAccordion;
