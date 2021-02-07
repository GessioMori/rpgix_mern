import React from "react";
import { useSelector } from "react-redux";

import { CircularProgress } from "@material-ui/core";

import UserJournal from "./UserJournal/UserJournal";
import MasterJournal from "./MasterJournal/MasterJournal";

const JournalTab = () => {
  const group = useSelector((state) => state.currentGroupReducer.currentGroup);

  return (
    <div>
      {!group ? (
        <div style={{ textAlign: "center", padding: "2em" }}>
          <CircularProgress />
        </div>
      ) : group?.isMaster ? (
        <MasterJournal group={group} />
      ) : (
        <UserJournal group={group} />
      )}
    </div>
  );
};

export default JournalTab;
