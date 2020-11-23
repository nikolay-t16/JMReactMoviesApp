import React from 'react';

import './CardsList.css';

import CardData from '../../block/CardComponent/CardData';
import CardComponent from '../../block/CardComponent/CardComponent';

type CardsListProps = {
  items: CardData[];
  guestSession: string | null;
};

function CardsList(props: CardsListProps) {
  const { items, guestSession } = props;
  const cards = items.map((card) => <CardComponent guestSession={guestSession} data={card} key={card.id} />);
  return (
    <div style={{ margin: 0 }} className="CardsList">
      {cards.length ? cards : <p>No results</p>}
    </div>
  );
}

export default CardsList;
