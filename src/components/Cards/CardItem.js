import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";
import GridListTile from "@material-ui/core/GridListTile";

class CardItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTextRecto: this.props.card.recto,
      editTextVerso: this.props.card.verso,
      checked: false
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTextRecto: this.props.card.recto,
      editTextVerso: this.props.card.verso
    }));
  };

  onChangeEditText = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditCard(
      this.props.card,
      this.state.editTextRecto,
      this.state.editTextVerso
    );

    this.setState({ editMode: false });
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { card, onRemoveCard } = this.props;
    const { editMode, editTextRecto, editTextVerso, checked } = this.state;
    const { classes } = this.props;

    return (
      <GridListTile>
        {editMode ? (
          <Card className={classes.card}>
            <CardContent>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="editTextRecto">Recto</InputLabel>
                <Input
                  type="text"
                  id="editTextRecto"
                  onChange={this.onChangeEditText}
                  autoFocus
                  value={editTextRecto}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="editTextVerso">Verso</InputLabel>
                <Input
                  type="text"
                  id="editTextVerso"
                  onChange={this.onChangeEditText}
                  autoFocus
                  value={editTextVerso}
                />
              </FormControl>
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {card.user.username || card.user.userId}{" "}
                {card.editedAt && <span>(Edited)</span>}
              </Typography>
              <Typography variant="h5" component="h2">
                {card.recto}
              </Typography>
              <Fade in={checked}>
                <Typography variant="h5" component="h2">
                  {card.verso}
                </Typography>
              </Fade>
            </CardContent>
            <CardActions>
              <FormControlLabel
                control={
                  <Switch checked={checked} onChange={this.handleChange} />
                }
                label="Show answer"
              />
            </CardActions>
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
            onClick={() => onRemoveCard(card.uid)}
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
  card: {
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
const CardItem = withStyles(styles)(CardItemBase);
export default CardItem;
