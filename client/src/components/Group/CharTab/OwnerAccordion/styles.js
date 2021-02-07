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
  attribute: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  signIconPositive: {
    fontSize: 30,
  },
  signIconNegative: {
    fontSize: 40,
  },
  attributeText: {
    display: "flex",
    alignItems: "center",
    color: "#444444",
    marginLeft: theme.spacing(1),
  },
  avaiable: {
    marginTop: theme.spacing(1),
  },
  button: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    marginRight: theme.spacing(1),
  },
  editMain: {
    fontWeight: "bold",
    color: "#616161",
    marginTop: theme.spacing(1),
  },
  gridAlign: {
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  input: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "90%",
  },
  alert: {
    marginTop: theme.spacing(2),
    backgroundColor: "#dc004e",
  },
}));

export default useStyles;
