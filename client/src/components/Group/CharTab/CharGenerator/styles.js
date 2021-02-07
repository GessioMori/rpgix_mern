import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
  },
  root: {
    padding: theme.spacing(1),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  button: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
  alert: {
    marginTop: theme.spacing(2),
    backgroundColor: "#dc004e",
  },
}));
