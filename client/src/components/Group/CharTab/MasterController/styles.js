import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  noChar: {
    margin: theme.spacing(2),
    color: "gray",
    textAlign: "center",
    width: "100%",
  },
}));

export default useStyles;
