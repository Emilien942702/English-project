import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
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
    e.preventDefault();
    this.props.firebase
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
	};
	
	handleOnChange = event => {
		this.setState({ [event.target.type]: event.target.value });
	};

  render() {

    return (
      <form
        style={style.container}
        onSubmit={event => this.onSubmit(event)}
      >
        <h3>Login</h3>
        <TextField
		type="email"
          placeholder="Enter your Email"
		  value={this.state.textFieldValue}
          onChange={this.handleOnChange}
        />
        <br />
        <TextField
          type="password"
          placeholder="Enter your Password"
		  value={this.state.textFieldValue}
          onChange={this.handleOnChange}
        />
        <br />
        <Button variant="contained"
          style={style.raisedBtn}
          type="submit"
        >Login</Button>
</form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const raisedBtn = {
  margin: 15
};

const container = {
  textAlign: 'center'
};

const style = {
  raisedBtn,
  container
};

export default SignInPage;

export { SignInForm };

