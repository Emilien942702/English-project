import React, { Component } from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import Cards from "../Cards";
import Decks from "../Decks";

class ListCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      value: 0
    };
  }

  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        users: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs value={value} onChange={this.handleChange} centered>
          <Tab label="Cards" />
          <Tab label="Decks" />
        </Tabs>
        {value === 0 && <Cards users={this.state.users} />}
        {value === 1 && <Decks users={this.state.users} />}
      </Paper>
    );
  }
}

const condition = authUser => !!authUser;
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});
export default compose(
  withFirebase,
  withAuthorization(condition),
  withStyles(styles)
)(ListCards);
