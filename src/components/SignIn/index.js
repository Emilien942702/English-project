import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const SignInPage = () => (
  <div>
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class SignInFormBase extends Component {
	
  constructor(props) {
    super(props);
	
	this.state = { ...INITIAL_STATE };
  }
   onSubmit = e => {
    const { email,password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
	  
      const { classes } = this.props
	  const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
	
<main className={classes.main}>
	<CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
		</Typography>
        <form className={classes.form} onSubmit={event => this.onSubmit(event)}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" onChange={this.onChange} name="email" autoComplete="email" autoFocus value={email} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" onChange={this.onChange} type="password" id="password" autoComplete="current-password" value={password} />
          </FormControl>
          <Button
			disabled={isInvalid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
		{error && <Typography variant="h6">{error.message}</Typography>}
        </form>
		
</Paper>
</main>
    );
  }
}

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SignInForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignInFormBase);


export default SignInPage;

export { SignInForm };

