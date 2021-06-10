import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    margin: 10,
    minWidth: 300,
    minHeight: 350,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  cardActionArea: {
    display: "flex",
    justifyContent: "space-between",
    top: "auto",
    bottom: 0,
  },
  logo: {
    margin: 5,
  },
}));
