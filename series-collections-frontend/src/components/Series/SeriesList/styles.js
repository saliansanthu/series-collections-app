import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  container: {
    marginBottom: 30,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  formControl: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
}));
