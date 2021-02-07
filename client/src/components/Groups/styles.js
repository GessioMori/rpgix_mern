import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(1),
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  container: {
    justifyContent: "center",
  },
  loading: {
    margin: theme.spacing(2),
    textAlign: "center",
    color: "#444444",
  },
}));
