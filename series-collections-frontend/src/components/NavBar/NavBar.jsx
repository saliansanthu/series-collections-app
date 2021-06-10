import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions/auth.js";
import jwtDecode from "jwt-decode";

import useStyles from "./styles.js";
import { resetStore } from "../../actions/index.js";

const NavBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTimeStamp = new Date().getTime() / 1000;
      if (decodedToken.exp < currentTimeStamp) handleLogout();
    }
  });

  const handleLogout = () => {
    dispatch(signOut());
    dispatch(resetStore());
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" noWrap className={classes.title}>
          📺Series Collection📁
        </Typography>
        {user && (
          <div className={classes.user}>
            <Avatar className={classes.avatar}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
