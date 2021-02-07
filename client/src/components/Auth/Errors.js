import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Errors = () => {
  let error = useSelector((state) => state.authReducer.authData);

  return (
    <div style={{ width: "100%" }}>
      {error === "User already exists" ? (
        <Alert variant="filled" severity="error">
          Nome de usuário já está cadastrado!
        </Alert>
      ) : null}
      {error === "E-mail already registered" ? (
        <Alert variant="filled" severity="error">
          E-mail já está cadastrado!
        </Alert>
      ) : null}
      {error === "Passwords don't match" ? (
        <Alert style={{ minWidth: "90%" }} severity="warning">
          Senhas não conferem!
        </Alert>
      ) : null}
      {error === "Password should have at least 6 characters" ? (
        <Alert style={{ minWidth: "90%" }} severity="warning">
          A senha precisa ter no mínimo 6 caracteres!
        </Alert>
      ) : null}
      {error === "Username should have at least 6 characters" ? (
        <Alert style={{ minWidth: "90%" }} severity="warning">
          O nome de usuário precisa ter no mínimo 6 caracteres!
        </Alert>
      ) : null}
      {error === "Something went wrong." ? (
        <Alert style={{ minWidth: "90%" }} severity="warning">
          Confira os dados fornecidos! Apenas utilize letras e números para o
          nome de usuário.
        </Alert>
      ) : null}
      {error === "User doesn't exist" ? (
        <Alert style={{ minWidth: "90%" }} severity="error">
          Nome de usuário não encontrado!
        </Alert>
      ) : null}
      {error === "Incorrect password" ? (
        <Alert style={{ minWidth: "90%" }} severity="error">
          Senha incorreta!
        </Alert>
      ) : null}
    </div>
  );
};

export default Errors;
