import React, { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useStyles from "./styles";

const AttributesForm = ({ parentCallback }) => {
  const classes = useStyles();

  const [attributes, setAttributes] = useState([0, 0, 0, 0, 0, 0]);
  const [buttonDisabled, setButtonDisabled] = useState([
    [true, false],
    [true, false],
    [true, false],
    [true, false],
    [true, false],
    [true, false],
  ]);
  const maxAttributes = 30;
  const [avaiablePoints, setAvaiablePoints] = useState(maxAttributes);

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
      setButtonDisabled(prevButtonDisabled);
    }
    if (sumOfAttributes < maxAttributes) {
      prevButtonDisabled.forEach(
        (element, index) => (prevButtonDisabled[index][1] = false)
      );
      setButtonDisabled(prevButtonDisabled);
    }
    prevAttributesArray.forEach((element, index) =>
      element === 0
        ? (prevButtonDisabled[index][0] = true)
        : (prevButtonDisabled[index][0] = false)
    );
    setButtonDisabled(prevButtonDisabled);
    parentCallback(prevAttributesArray);
  };
  const buttonTheme = createMuiTheme({
    palette: { primary: { main: "#4791db" }, secondary: { main: "#dc004e" } },
  });
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Grid item className={`${classes.attributeText} ${classes.avaiable}`}>
        <Typography variant="body1">{`Pontos disponíveis: ${avaiablePoints}`}</Typography>
      </Grid>
      {[
        "FORÇA",
        "DESTREZA",
        "CONSTITUIÇÃO",
        "INTELIGÊNCIA",
        "SABEDORIA",
        "CARISMA",
      ].map((element, index) => (
        <Grid container key={element} className={classes.attribute}>
          <Button
            className={classes.button}
            onClick={() => {
              handleAttributeChange(index, -1);
            }}
            disabled={buttonDisabled[index][0]}
            variant="contained"
            color="secondary"
          >
            <Typography className={classes.signIconNegative}> -</Typography>
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
            <Typography className={classes.signIconPositive}>+</Typography>
          </Button>
          <Grid item className={classes.attributeText}>
            <Typography variant="body1">{`${element}: ${attributes[index]}`}</Typography>
          </Grid>
        </Grid>
      ))}
    </MuiThemeProvider>
  );
};

export default React.memo(AttributesForm);
