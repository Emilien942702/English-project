import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

class AccountDeleteBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.firebase.doDeleteUser().catch(error => {
      this.setState({ error });
    });
    this.props.firebase
      .user(this.props.firebase.auth.currentUser.uid)
      .remove()
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Delete account
          </Typography>
          <form
            className={classes.form}
            onSubmit={event => this.onSubmit(event)}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Delete
            </Button>
            {error && <Typography variant="h5">{error.message}</Typography>}
          </form>
        </Paper>
      </main>
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

const AccoundDelete = compose(
  withFirebase,
  withStyles(styles)
)(AccountDeleteBase);

export default AccoundDelete;
