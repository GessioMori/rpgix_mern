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
  details: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  detailsBlockAvatar: {
    marginTop: theme.spacing(1),
    justifyItems: "center",
    textAlign: "center",
  },
  detailsBlock: {
    marginTop: theme.spacing(1),
    justifyItems: "center",
  },

  typoMain: {
    display: "inline-block",
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  typoSec: {
    display: "inline-block",
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
}));

export default useStyles;
