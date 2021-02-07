import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  charList: {
    flexDirection: "column",
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: "#444444",
    textAlign: "center",
  },
}));
