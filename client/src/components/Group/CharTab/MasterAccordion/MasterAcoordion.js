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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./styles";

import { masterEditCharacter } from "./../../../../api/index";
import { getGroup } from "./../../../../actions/groups";

const buttonTheme = createMuiTheme({
  palette: { primary: { main: "#4791db" }, secondary: { main: "#dc004e" } },
});

const inputTheme = createMuiTheme({
  palette: { primary: { main: "#00695f" } },
});

const MasterAccordion = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(false);
  const [life, setLife] = useState(character.life);
  const [items, setItems] = useState(character.items);
  const [level, setLevel] = useState(character.level);
  const [charClass, setCharClass] = useState(character.charClass);
  const [charClassInput, setCharClassInput] = useState("");
  const [newItem, setNewItem] = useState("");

  const changeLevel = (value) => {
    let newLevel = level + value;
    setLevel(newLevel);
  };
  const changeLife = (value) => {
    let newLife = life + value;
    setLife(newLife);
  };

  const handleItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleClassChange = (e) => {
    setCharClassInput(e.target.value);
  };

  const modifyCharClass = () => {
    if (charClassInput) {
      let newClass = charClassInput;
      setCharClass(newClass);
    }
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const addItem = () => {
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem("");
    }
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const removeItem = (index) => {
    let newItems = items.filter((e, i) => i !== index);
    setItems(newItems);
  };

  const submitChanges = () => {
    let editData = {
      level,
      life,
      items,
      charClass,
      charId: character._id,
    };
    masterEditCharacter(editData, character.group)
      .then(() => {
        dispatch(getGroup(character.group));
        setEditor(false);
      })
      .catch((error) => console.log(error));
  };

  const cancelChanges = () => {
    setItems(character.items);
    setLife(character.life);
    setLevel(character.level);
    setCharClass(character.charClass);
    setCharClassInput("");
    setNewItem("");
    setEditor(false);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Grid container className={classes.root}>
        <Accordion className={classes.accordion}>
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
                  <Grid item xs={12} md={3} className={classes.detailsBlock}>
                    <Typography className={classes.editMain}>
                      Mudar nível do personagem:
                    </Typography>
                    <Grid container className={classes.gridAlign}>
                      <Button
                        className={classes.button}
                        onClick={() => changeLevel(-1)}
                        variant="contained"
                        color="secondary"
                      >
                        <Typography className={classes.signIconNegative}>
                          -
                        </Typography>
                      </Button>
                      <Button
                        className={classes.button}
                        onClick={() => changeLevel(1)}
                        variant="contained"
                        color="primary"
                      >
                        <Typography className={classes.signIconPositive}>
                          +
                        </Typography>
                      </Button>
                      <Grid item className={classes.attributeText}>
                        <Typography className={classes.typoMain}>
                          Nível:&nbsp;
                        </Typography>
                        <Typography className={classes.typoSec}>
                          {level}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography className={classes.editMain}>
                      Mudar os pontos de vida:
                    </Typography>
                    <Grid container className={classes.gridAlign}>
                      <Button
                        className={classes.button}
                        onClick={() => changeLife(-1)}
                        variant="contained"
                        color="secondary"
                      >
                        <Typography className={classes.signIconNegative}>
                          -
                        </Typography>
                      </Button>
                      <Button
                        className={classes.button}
                        onClick={() => changeLife(1)}
                        variant="contained"
                        color="primary"
                      >
                        <Typography className={classes.signIconPositive}>
                          +
                        </Typography>
                      </Button>
                      <Grid item className={classes.attributeText}>
                        <Typography className={classes.typoMain}>
                          PV:&nbsp;
                        </Typography>
                        <Typography className={classes.typoSec}>
                          {life}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography className={classes.editMain}>
                      Mudar a classe do personagem:
                    </Typography>
                    <Grid container className={classes.gridAlign}>
                      <Grid item className={classes.attributeText}>
                        <Typography className={classes.typoMain}>
                          Classe:&nbsp;
                        </Typography>
                        <Typography className={classes.typoSec}>
                          {charClass}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.gridAlign2}>
                      <MuiThemeProvider theme={inputTheme}>
                        <TextField
                          label="Classe"
                          variant="outlined"
                          color="primary"
                          className={classes.input}
                          onChange={handleClassChange}
                        />
                        <Button
                          className={classes.button}
                          onClick={modifyCharClass}
                          variant="contained"
                          color="primary"
                        >
                          <Typography className={classes.signIconPositive}>
                            &#10003;
                          </Typography>
                        </Button>
                      </MuiThemeProvider>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5} className={classes.detailsBlock}>
                    <Typography className={classes.editMain}>
                      Adicionar ou remover items
                    </Typography>
                    {items.map((element, index) => (
                      <Grid container key={index} className={classes.gridAlign}>
                        <Button
                          className={classes.button}
                          onClick={() => removeItem(index)}
                          variant="contained"
                          color="secondary"
                        >
                          <Typography className={classes.signIconNegative}>
                            -
                          </Typography>
                        </Button>
                        <Typography className={classes.typoSec}>
                          {element}
                        </Typography>
                      </Grid>
                    ))}
                    <Grid container className={classes.gridAlign2}>
                      <MuiThemeProvider theme={inputTheme}>
                        <TextField
                          label="Adicionar item"
                          variant="outlined"
                          color="primary"
                          className={classes.input}
                          onChange={handleItemChange}
                        />
                      </MuiThemeProvider>
                      <Button
                        className={classes.button}
                        onClick={addItem}
                        variant="contained"
                        color="primary"
                      >
                        <Typography className={classes.signIconPositive}>
                          +
                        </Typography>
                      </Button>
                    </Grid>
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

export default MasterAccordion;
