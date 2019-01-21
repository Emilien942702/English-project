import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class CardItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTextRecto: this.props.card.recto,
      editTextVerso: this.props.card.verso,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTextRecto: this.props.card.recto,
      editTextVerso: this.props.card.verso,
    }));
  };

  onChangeEditText = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditCard(this.props.card, this.state.editTextRecto, this.state.editTextVerso);

    this.setState({ editMode: false });
  };

  render() {
    const { card, onRemoveCard } = this.props;
    const { editMode, editTextRecto, editTextVerso } = this.state;
      const { classes } = this.props

    return (
      <li>
        {editMode ? (
		<div>
		<FormControl margin="normal" required fullWidth>
				<InputLabel htmlFor="editTextRecto">Recto</InputLabel>
				<Input type="text" id="editTextRecto" onChange={this.onChangeEditText} autoFocus value={editTextRecto} />
		</FormControl>
		<FormControl margin="normal" required fullWidth>
				<InputLabel htmlFor="editTextVerso">Verso</InputLabel>
				<Input type="text" id="editTextVerso" onChange={this.onChangeEditText} autoFocus value={editTextVerso} />
		</FormControl>  
		</div>
        ) : (
          <span>
            <strong>
              {card.user.username || card.user.userId}
            </strong>{' '}
            {"Recto : "+card.recto} {" Verso : "+card.verso} {card.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {editMode ? (
          <span>
            <Button variant="contained" color="primary" onClick={this.onSaveEditText} className={classes.button}>Save</Button>
            <Button variant="contained" color="primary" onClick={this.onToggleEditMode} className={classes.button}>Reset</Button>
          </span>
        ) : (
          <Button variant="contained" color="primary" onClick={this.onToggleEditMode} className={classes.button}>Edit</Button>
        )}

        {!editMode && (
          <Button
			variant="contained" color="primary"
            type="button"
            onClick={() => onRemoveCard(card.uid)}
          className={classes.button}>
            Delete
          </Button>
        )}
      </li>
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
const CardItem = withStyles(styles)(CardItemBase);
export default CardItem;
