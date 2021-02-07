import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  charName: {
    display: "inline-block",
  },
  deleteButton: {
    display: "inline-block",
  },
  charItem: {
    flexDirection: "row",
  },
  confirmText: {
    color: "#616161",
  },
  confirmDiv: {
    marginLeft: theme.spacing(1),
  },
}));
