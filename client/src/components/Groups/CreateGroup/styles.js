import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    color: "#444444",
  },
}));
