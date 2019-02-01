import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const INITIAL_STATE = {
  email: "",
  error: null
};

class EmailChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = e => {
    const { email } = this.state;
    e.preventDefault();
    this.props.firebase.doEmailUpdate(email).catch(error => {
      this.setState({ error });
    });
    this.props.firebase
      .user(this.props.firebase.auth.currentUser.uid)
      .update({
        email
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, error } = this.state;

    const isInvalid = email === "";
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change email
          </Typography>
          <form
            className={classes.form}
            onSubmit={event => this.onSubmit(event)}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                refs="email"
                name="email"
                onChange={this.onChange}
                type="email"
                id="email"
                autoComplete="current-email"
                value={email}
              />
            </FormControl>
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change
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

const EmailChangeForm = compose(
  withFirebase,
  withStyles(styles)
)(EmailChangeFormBase);

export default EmailChangeForm;
