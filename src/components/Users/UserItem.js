import React, { Component } from 'react';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import Checkbox from '@material-ui/core/Checkbox';

import { withFirebase } from '../Firebase';

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
	  edit: false,
	  username: null,
	  email: null,
	  admin: false,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };
  onEdit = e => {
    const { user, username, email, admin } = this.state;
	const roles = [];
	if (admin) {
      roles.push(ROLES.ADMIN);
	}
    e.preventDefault();
	  this.props.firebase
          .user(user.uid)
          .set({
           username,
           email,
		   roles,
          })
		  .then(() => {
			this.props.history.push(ROUTES.ADMIN);
          })
          .catch(error => {
            this.setState({ error });
          });
  };
  onEditToggle = () => {
    const { user } = this.state;
    this.setState({
		edit: true,
		username: user.username,
		email: user.email,
		admin: user.roles===undefined ? false : true,
	});
  };
  onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
  onCheck = event => {
	  this.setState({ [event.target.name]: event.target.checked });
	};
  render() {
    const { user, loading, edit, username, email, admin } = this.state;
      const { classes } = this.props

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && !edit && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid+" "}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email+" "}
            </span>
            <span>
              <strong>Username:</strong> {user.username+" "}
            </span>
			<span>
			  <strong>Admin:</strong> {user.roles===undefined ? "false " : "true "}
			</span>
			<span><Button variant="contained" color="secondary" onClick={this.onEditToggle} className={classes.button}>Edit user</Button></span>
		  </div>
			)}
		{user && edit && (
          <div>
            <form className={classes.form} onSubmit={event => this.onEdit(event)}>
			<TextField
				name="username"
				label="Username"
				className={classes.textField}
				value={username}
				onChange={this.onChange}
				margin="normal"
			  />
			  <TextField
				name="email"
				label="Email"
				className={classes.textField}
				value={email}
				onChange={this.onChange}
				margin="normal"
			  />
			  <Checkbox
			    name="admin"
				onChange={this.onCheck}
				checked={admin}
				color="primary"
			  />
			  <Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			  >
				Save
			  </Button>
			</form>
            <span>
			<Button variant="contained" color="secondary" onClick={this.onSendPasswordResetEmail} className={classes.button}>
			Reset password via email
			</Button>
            </span>
		  </div>
			)}
      </div>
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
    width: '20%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
const UserItem = compose(
  withFirebase,
  withStyles(styles)
)(UserItemBase);
export default UserItem;
