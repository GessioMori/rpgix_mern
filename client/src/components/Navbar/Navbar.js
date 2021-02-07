import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import {
  AppBar,
  Avatar,
  Hidden,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";

import RPGixLogo from "./../../images/logoRPGixR.svg";

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  }, [dispatch, history]);

  const handleReturn = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    } else {
      logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Avatar alt="RPGix Logo" src={RPGixLogo} variant="square"></Avatar>
          <Typography variant="h6" className={classes.title}>
            <Hidden xsDown>RPGix - Plataforma educacional de RPG</Hidden>
          </Typography>
          {location.pathname !== "/dashboard" ? (
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleReturn}
            >
              Voltar
            </Button>
          ) : null}

          <Button
            variant="contained"
            className={classes.button}
            onClick={logout}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
