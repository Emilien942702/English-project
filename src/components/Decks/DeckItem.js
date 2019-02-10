import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import { compose } from "recompose";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { withFirebase } from "../Firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GridListTile from "@material-ui/core/GridListTile";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class DeckItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTextRecto: this.props.deck.nom,
      editCartes: this.props.deck.cartes,
      cartesDispo: []
    };
  }
  componentDidMount() {
    this.onListenForCards();
  }

  onListenForCards = () => {
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
            cartesDispo: cardList
          });
        } else {
          this.setState({ cartesDispo: [] });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.cards().off();
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTextNom: this.props.deck.nom,
      editCartes: this.props.deck.cartes
    }));
  };

  onChangeEditText = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditDeck(
      this.props.deck,
      this.state.editTextNom,
      this.state.editCartes
    );

    this.setState({ editMode: false });
  };

  handleChangeCarte = event => {
    this.setState({ editCartes: event.target.value });
  };

  render() {
    const { deck, onRemoveDeck } = this.props;
    const { editMode, editTextNom, editCartes, cartesDispo } = this.state;
    const { classes } = this.props;

    return (
      <GridListTile>
        {editMode ? (
          <Card className={classes.deck}>
            <CardContent>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="editTextNom">Nom</InputLabel>
                <Input
                  type="text"
                  id="editTextNom"
                  onChange={this.onChangeEditText}
                  autoFocus
                  value={editTextNom}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Cards</InputLabel>
                <Select
                  multiple
                  value={editCartes}
                  onChange={this.handleChangeCarte}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={cartesDispo.find(a => a.uid === value).recto}
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
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.deck}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {deck.user.username || deck.user.userId}{" "}
                {deck.editedAt && <span>(Edited)</span>}
              </Typography>
              <Typography variant="h5" component="h2">
                {deck.nom}
              </Typography>
            </CardContent>
          </Card>
        )}

        {editMode ? (
          <span>
            <IconButton
              variant="contained"
              color="primary"
              onClick={this.onSaveEditText}
              className={classes.button}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              variant="contained"
              color="primary"
              onClick={this.onToggleEditMode}
              className={classes.button}
            >
              <CancelIcon />
            </IconButton>
          </span>
        ) : (
          <IconButton
            variant="contained"
            color="primary"
            onClick={this.onToggleEditMode}
            className={classes.button}
          >
            <EditIcon />
          </IconButton>
        )}

        {!editMode && (
          <IconButton
            variant="contained"
            color="secondary"
            type="button"
            onClick={() => onRemoveDeck(deck.uid)}
            className={classes.button}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </GridListTile>
    );
  }
}
const styles = {
  deck: {
    minWidth: 275,
    marginRight: 12
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
    marginBottom: 12
  }
};
const DeckItem = compose(
  withFirebase,
  withStyles(styles)
)(DeckItemBase);

export default DeckItem;
