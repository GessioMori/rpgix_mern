import React from "react";
import { useSelector } from "react-redux";

import { CircularProgress } from "@material-ui/core";

import CharGenerator from "./CharGenerator/CharGenerator";

import MasterController from "./MasterController/MasterController";
import UserController from "./UserController/UserController";

const CharTab = () => {
  const group = useSelector((state) => state.currentGroupReducer.currentGroup);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div>
      {!group ? (
        <div style={{ textAlign: "center", padding: "2em" }}>
          <CircularProgress />
        </div>
      ) : group?.isMaster ? (
        <MasterController group={group} />
      ) : group?.group.membersWithChar.includes(user.result._id) ? (
        <UserController group={group} />
      ) : (
        <CharGenerator />
      )}
    </div>
  );
};

export default CharTab;
