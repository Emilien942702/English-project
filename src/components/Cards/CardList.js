import React from 'react';

import CardItem from './CardItem';

const CardList = ({
  cards,
  onEditCard,
  onRemoveCard,
}) => (
  <ul>
    {cards.map(card => (
      <CardItem
        key={card.uid}
        card={card}
        onEditCard={onEditCard}
        onRemoveCard={onRemoveCard}
      />
    ))}
  </ul>
);

export default CardList;
