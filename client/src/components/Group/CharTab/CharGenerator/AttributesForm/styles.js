import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  button: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    marginLeft: theme.spacing(1),
  },
  attribute: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  signIconPositive: {
    fontSize: 30,
  },
  signIconNegative: {
    fontSize: 40,
  },
  attributeText: {
    display: "flex",
    alignItems: "center",
    color: "#444444",
    marginLeft: theme.spacing(1),
  },
  avaiable: {
    marginTop: theme.spacing(1),
  },
}));
