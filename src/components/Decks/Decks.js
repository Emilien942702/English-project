import React, { Component } from "react";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import DeckList from "./DeckList";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "recompose";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class DecksBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nom: "",
      cartes: [],
      loading: false,
      decks: [],
      cartesDispo: []
    };
  }
  
  componentDidMount() {
    this.onListenForDecks();
  }

  onListenForDecks = () => {
    this.setState({ loading: true });

    this.props.firebase
      .decks()
      .orderByChild("createdAt")
      .on("value", snapshot => {
        const deckObject = snapshot.val();

        if (deckObject) {
          const deckList = Object.keys(deckObject).map(key => ({
            ...deckObject[key],
            uid: key
          }));

          this.setState({
            decks: deckList,
            loading: false
          });
        } else {
          this.setState({ decks: [], loading: false });
        }
      });
    this.props.firebase
      .cards()
      .orderByChild("createdAt")
      .on("value", snapshot => {
        const cardObject = snapshot.val();

        if (cardObject) {
          const cardList = Object.keys(cardObject).map(key => ({
            ...cardObject[key],
            uid: key
          }));

          this.setState({
            cartesDispo: cardList,
            loading: false
          });
        } else {
          this.setState({ cartesDispo: [], loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.decks().off();
    this.props.firebase.cards().off();
  }

  onChangeText = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onCreateDeck = (event, authUser) => {
    this.props.firebase.decks().push({
      nom: this.state.nom,
      cartes: this.state.cartes,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({ nom: "", cartes: [] });

    event.preventDefault();
  };

  onEditDeck = (deck, nom, cartes) => {
    this.props.firebase.deck(deck.uid).set({
      ...deck,
      nom,
      cartes,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onRemoveDeck = uid => {
    this.props.firebase.deck(uid).remove();
  };

  handleChangeCarte = event => {
    this.setState({ cartes: event.target.value });
  };

  

  render() {
    const { users } = this.props;
    const { nom, decks, loading, cartes, cartesDispo } = this.state;
    const { classes } = this.props;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>

            {loading && <div>Loading ...</div>}

            {decks && (
              <DeckList
                decks={decks.map(deck => ({
                  ...deck,
                  user: users ? users[deck.userId] : { userId: deck.userId }
                }))}
                onEditDeck={this.onEditDeck}
                onRemoveDeck={this.onRemoveDeck}
              />
            )}

            {!decks && <div>There are no decks ...</div>}
            <Card className={classes.deck}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Add deck
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={event => this.onCreateDeck(event, authUser)}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="nom">Nom</InputLabel>
                    <Input
                      type="text"
                      id="nom"
                      onChange={this.onChangeText}
                      autoFocus
                      value={nom}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-chip">
                      Cards
                    </InputLabel>
                    <Select
                      multiple
                      value={cartes}
                      onChange={this.handleChangeCarte}
                      MenuProps={MenuProps}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={
                                cartesDispo.find(a => a.uid === value).recto
                              }
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {cartesDispo.map(carte => (
                        <MenuItem key={carte.uid} value={carte.uid}>
                          {carte.recto}
                        </MenuItem>
                      ))}
                    </Select>
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
  deck: {
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
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  }
});
const Decks = compose(
  withFirebase,
  withStyles(styles)
)(DecksBase);

export default Decks;
