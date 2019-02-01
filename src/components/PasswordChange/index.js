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
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = e => {
    const { passwordOne } = this.state;
    e.preventDefault();
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <form
            className={classes.form}
            onSubmit={event => this.onSubmit(event)}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordOne">Password</InputLabel>
              <Input
                refs="passwordOne"
                name="passwordOne"
                onChange={this.onChange}
                type="password"
                id="passwordOne"
                autoComplete="current-password"
                value={passwordOne}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordTwo">Confirm Password</InputLabel>
              <Input
                refs="passwordTwo"
                name="passwordTwo"
                onChange={this.onChange}
                type="password"
                id="passwordTwo"
                autoComplete="current-password"
                value={passwordTwo}
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

const PasswordChangeForm = compose(
  withFirebase,
  withStyles(styles)
)(PasswordChangeFormBase);

export default PasswordChangeForm;
