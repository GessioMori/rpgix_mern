import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  chapterForm: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  chapters: {
    width: "100%",
    padding: theme.spacing(1),
  },
  noChapter: {
    margin: theme.spacing(2),
    color: "gray",
    textAlign: "center",
  },
}));
