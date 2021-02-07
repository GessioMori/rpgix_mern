import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Errors = () => {
  let error = useSelector(
    (state) => state.groupCreatorReducer.groupCreatorData
  );

  return (
    <div style={{ width: "100%" }}>
      {error === "Group code already exists" ? (
        <Alert variant="filled" severity="error">
          O código do grupo já está em uso!
        </Alert>
      ) : null}
      {error === "Image is too big" ? (
        <Alert variant="filled" severity="error">
          A imagem é muito grande para ser enviada!
        </Alert>
      ) : null}
    </div>
  );
};

export default Errors;
