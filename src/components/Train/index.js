import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import  MS from 'memory-scheduler';

class TrainBase extends Component {
  render() {
    const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;

  const today = Math.round(new Date().getTime() / DAY_IN_MINISECONDS);

  const yesterday = today-1;

  const ms = new MS([1, 2, 3, 8, 17], [-3, -1, 1]);

  const record = ms.getInitialRecord(yesterday);
  const updatedRecord = ms.calculate( 4, record, today);
    return(
    <div>
      <h1>{updatedRecord.progress}</h1>
      <h1>{updatedRecord.dueDate.toString()}</h1>
    </div>
    );
  }
}

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const Train = compose(
  withFirebase,
  withStyles(styles)
)(TrainBase);

export default Train;
