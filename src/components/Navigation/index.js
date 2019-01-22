import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AuthUserContext } from '../Session';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <div>
     <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
</AuthUserContext.Consumer>
  </div>
);


class NavigationNonAuthBase extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Landing" component={Link} to={ROUTES.LANDING} />
        <BottomNavigationAction label="Sign in" component={Link} to={ROUTES.SIGN_IN} />
      </BottomNavigation>
	  
    );
  }
}


class NavigationAuthBase extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
	const { authUser } = this.props;
    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Landing" component={Link} to={ROUTES.LANDING} />
        <BottomNavigationAction label="Home" component={Link} to={ROUTES.HOME} />
        <BottomNavigationAction label="Account" component={Link} to={ROUTES.ACCOUNT} />
		{authUser.roles.includes(ROLES.ADMIN) && (
		
        <BottomNavigationAction label="Admin" component={Link} to={ROUTES.ADMIN} />
		
		)}

		<SignOutButton />
      </BottomNavigation>
	  
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

const NavigationAuth = compose(
  withRouter,
  withStyles(styles)
)(NavigationAuthBase);
const NavigationNonAuth = compose(
  withRouter,
  withStyles(styles)
)(NavigationNonAuthBase);

export default Navigation;
export { NavigationAuth, NavigationNonAuth };

