import React from 'react';

import CardItem from './CardItem';
import GridList from '@material-ui/core/GridList';

const CardList = ({
  cards,
  onEditCard,
  onRemoveCard,
}) => (
<GridList component="nav">
    {cards.map(card => (
      <CardItem
        key={card.uid}
        card={card}
        onEditCard={onEditCard}
        onRemoveCard={onRemoveCard}
      />
    ))}
</GridList>
);
export default CardList;
