import React, { Component } from "react";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import CardList from "./CardList";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { compose } from "recompose";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

class CardsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recto: "",
      verso: "",
      loading: false,
      cards: [],
      limit: 5
    };
  }

  componentDidMount() {
    this.onListenForCards();
  }

  onListenForCards = () => {
    this.setState({ loading: true });

    this.props.firebase
      .cards()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", snapshot => {
        const cardObject = snapshot.val();

        if (cardObject) {
          const cardList = Object.keys(cardObject).map(key => ({
            ...cardObject[key],
            uid: key
          }));

          this.setState({
            cards: cardList,
            loading: false
          });
        } else {
          this.setState({ cards: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.cards().off();
  }

  onChangeText = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onCreateCard = (event, authUser) => {
    this.props.firebase.cards().push({
      recto: this.state.recto,
      verso: this.state.verso,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({ recto: "", verso: "" });

    event.preventDefault();
  };

  onEditCard = (card, recto, verso) => {
    this.props.firebase.card(card.uid).set({
      ...card,
      recto,
      verso,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onRemoveCard = uid => {
    this.props.firebase.card(uid).remove();
  };

  onNextPage = () => {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForCards);
  };

  render() {
    const { users } = this.props;
    const { recto, cards, loading, verso } = this.state;
    const { classes } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && cards && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.onNextPage}
                className={classes.button}
              >
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {cards && (
              <CardList
                cards={cards.map(card => ({
                  ...card,
                  user: users ? users[card.userId] : { userId: card.userId }
                }))}
                onEditCard={this.onEditCard}
                onRemoveCard={this.onRemoveCard}
              />
            )}

            {!cards && <div>There are no cards ...</div>}
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Add Card
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={event => this.onCreateCard(event, authUser)}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="recto">Recto</InputLabel>
                    <Input
                      type="text"
                      id="recto"
                      onChange={this.onChangeText}
                      autoFocus
                      value={recto}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="verso">Verso</InputLabel>
                    <Input
                      type="text"
                      id="verso"
                      onChange={this.onChangeText}
                      value={verso}
                    />
                  </FormControl>
                  <IconButton
                    style={{ width: "100%", textAlign: "right" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    <AddIcon />
                  </IconButton>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </AuthUserContext.Consumer>
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
  },
  card: {
    minWidth: 275,
    width: "20%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12,
    marginRight: 12
  }
});
const Cards = compose(
  withFirebase,
  withStyles(styles)
)(CardsBase);

export default withFirebase(Cards);
