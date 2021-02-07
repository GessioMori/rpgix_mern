import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  title: {
    color: "white",
    margin: theme.spacing(1),
    textAlign: "right",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  button: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  masterButton: {
    justifyContent: "flex-end",
    marginRight: "0.5rem",
  },
}));
