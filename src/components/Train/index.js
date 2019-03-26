import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import { WORST, BEST, calculate, getPercentOverdue } from 'sm2-plus';

class TrainBase extends Component {
  render() {
    const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
    const getDaysSinceEpoch = () => (
        Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
    );

    const TODAY = getDaysSinceEpoch();

    const testWord = {
      word: 'test',
      update: TODAY - 17,    
      difficulty: 0.2,
      interval: 100
    };
    const {difficulty,interval,dueDate,update,word} = calculate(testWord, 1, TODAY);
    const testWordUpdated = {
      word: 'test',
      update: update,    
      difficulty: difficulty,
      interval: interval
    };
    const percent = getPercentOverdue(testWordUpdated,TODAY);
    return(
    <div>
      <h1>{difficulty}</h1>
      <h1>{interval}</h1>
      <h1>{dueDate}</h1>
      <h1>{update}</h1>
      <h1>{word}</h1>
      <h1>{percent}</h1>
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
