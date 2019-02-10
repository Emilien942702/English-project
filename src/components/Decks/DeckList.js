import React from "react";

import DeckItem from "./DeckItem";
import GridList from "@material-ui/core/GridList";

const DeckList = ({ decks, onEditDeck, onRemoveDeck }) => (
  <GridList component="nav">
    {decks.map(deck => (
      <DeckItem
        key={deck.uid}
        deck={deck}
        onEditDeck={onEditDeck}
        onRemoveDeck={onRemoveDeck}
      />
    ))}
  </GridList>
);
export default DeckList;
