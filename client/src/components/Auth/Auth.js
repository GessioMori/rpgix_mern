import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  CssBaseline,
} from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Errors from "./Errors";
import useStyles from "./styles";
import { signin, signup } from "../../actions/auth";

import logoRPGix from "../../images/logoRPGix.svg";

const initialFormState = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user) {
      history.push("/dashboard");
    }
  }, [location, history, user]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logoRPGix} alt={"logoRPGix"} className={classes.logo} />
          {!user ? (
            <>
              <Errors />
              <Typography variant="h5" className={classes.title}>
                {isSignUp ? "Faça seu cadastro" : "Faça seu login"}
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {isSignUp && (
                    <>
                      <Input
                        name="name"
                        label="Nome completo"
                        handleChange={handleChange}
                      />
                      <Input
                        name="email"
                        label="E-mail"
                        handleChange={handleChange}
                      />
                    </>
                  )}
                  <Input
                    name="username"
                    label="Nome de usuário"
                    handleChange={handleChange}
                  />
                  <Input
                    name="password"
                    label="Senha"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                  />
                  {isSignUp && (
                    <Input
                      name="confirmPassword"
                      label="Repita a senha"
                      handleChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      handleShowPassword={handleShowPassword}
                    />
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    color="secondary"
                  >
                    {isSignUp ? "Cadastrar" : "Entrar"}
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button onClick={switchMode}>
                        {isSignUp
                          ? "Já tem uma conta? Entre aqui!"
                          : "Não tem uma conta? Cadastre-se aqui!"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </>
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;
