import React from "react";
import Avatar from "awesome-react-avataaars-multiple";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./styles";

const CharAccordion = ({ character }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.accordionSummary}
        >
          <div>
            <Typography className={classes.titleMain}>
              {character.name}&nbsp;&nbsp;
            </Typography>
            <Typography className={classes.titleSec}>
              {character?.userName ? `(${character.userName})` : null}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={classes.details}>
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
            <Grid item xs={12} sm={5} md={3} className={classes.detailsBlock}>
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

              <Typography className={classes.typoMain}>Atributos:</Typography>
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
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default CharAccordion;
