import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Auth from "./components/Auth/Auth";
import Pages from "./components/Pages/Pages";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
    secondary: {
      main: "#00695f",
    },
  },
});

const App = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/dashboard" component={Pages} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </>
  );
};

export default App;
