import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordion: {
    width: "100%",
  },
  accordionSummary: {
    backgroundColor: "rgba(0, 105, 95, 1)",
    marginBottom: 2,
    minHeight: 56,
    color: "white",
  },
  titleMain: {
    fontWeight: "bold",
    display: "inline-block",
    fontSize: theme.typography.pxToRem(18),
  },
  titleSec: {
    display: "inline-block",
    fontSize: theme.typography.pxToRem(18),
  },
  content: {
    whiteSpace: "pre-wrap",
  },
}));

export default useStyles;
