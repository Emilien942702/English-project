import React from "react";
import { AuthUserContext } from "../Session";
import PasswordChangeForm from "../PasswordChange";
import EmailChangeForm from "../EmailChange";
import AccountDelete from "../AccountDelete";
import { withAuthorization } from "../Session";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "recompose";
const AccountPageBase = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Account: {authUser.email}
        </Typography>
        <PasswordChangeForm />
        <EmailChangeForm />
        <AccountDelete />
      </div>
    )}
  </AuthUserContext.Consumer>
);
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

const authCondition = authUser => !!authUser;

const AccountPage = compose(
  withAuthorization(authCondition),
  withStyles(styles)
)(AccountPageBase);

export default AccountPage;
