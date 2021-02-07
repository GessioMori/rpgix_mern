import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    paddingLeft: 0,
  },
  title: {
    flexGrow: 1,
    marginLeft: "1rem",
  },
  appbar: {
    width: "100%",
    backgroundColor: "#00695f",
  },

  button: {
    backgroundColor: "#gray",
    color: "#00695f",
    marginLeft: theme.spacing(1),
  },
}));
