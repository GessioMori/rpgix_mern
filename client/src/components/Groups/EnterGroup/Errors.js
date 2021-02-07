import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Errors = () => {
  let error = useSelector((state) => state.groupEnterReducer.groupEnterData);

  return (
    <div style={{ width: "100%" }}>
      {error === "Group not found" ? (
        <Alert variant="filled" severity="error">
          Grupo não encontrado. Verifique o código!
        </Alert>
      ) : null}
      {error === "User already in group" ? (
        <Alert variant="filled" severity="warning">
          Você já faz parte desse grupo!
        </Alert>
      ) : null}
      {error === "User not allowed" ? (
        <Alert variant="filled" severity="error">
          Você foi banido(a) desse grupo!
        </Alert>
      ) : null}
    </div>
  );
};

export default Errors;
