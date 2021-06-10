import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
    marginTop: 0,
  },

  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },

  title: {
    flexGrow: 1,
  },
  user: {
    display: "flex",
    justifyContent: "space-between",
    width: 150,
  },
  avatar: {
    color: "#fff",
    backgroundColor: "red",
  },
}));
