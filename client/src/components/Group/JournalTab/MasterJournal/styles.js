import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  journals: {
    width: "100%",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  pages: {
    flexDirection: "column",
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  noChar: {
    margin: theme.spacing(2),
    color: "gray",
    textAlign: "center",
  },
}));
