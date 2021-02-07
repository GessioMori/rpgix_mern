import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";

import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";

import CharTab from "./CharTab/CharTab";
import StoryTab from "./StoryTab/StoryTab";
import JournalTab from "./JournalTab/JournalTab";

import { getGroup } from "./../../actions/groups";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const Group = () => {
  const groupId = useParams().id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getGroup(groupId));
  }, [dispatch, groupId]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab icon={<FaceRoundedIcon />} label="Personagem" />
          <Tab icon={<MenuBookRoundedIcon />} label="História" />
          <Tab icon={<BorderColorRoundedIcon />} label="Diário" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <CharTab />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <StoryTab />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <JournalTab />
      </TabPanel>
    </div>
  );
};

export default Group;
