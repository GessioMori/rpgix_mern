import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  pageForm: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  pages: {
    width: "100%",
    padding: theme.spacing(1),
  },
  noPage: {
    margin: theme.spacing(2),
    color: "gray",
    textAlign: "center",
  },
}));
