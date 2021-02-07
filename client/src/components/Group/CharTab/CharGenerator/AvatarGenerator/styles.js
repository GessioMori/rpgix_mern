import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexDirection: "column",
  },
  containerImg: {
    textAlign: "center",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  title: {
    color: "#444444",
  },
}));
