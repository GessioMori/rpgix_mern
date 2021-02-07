import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  deleteButton: {
    display: "inline-block",
  },
  confirmText: {
    color: "#616161",
  },
  confirmDiv: {
    justifyContent: "center",
    alignItems: "center",
  },
}));
