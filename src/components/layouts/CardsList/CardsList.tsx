import React from 'react';
import CardData from '../../block/CardComponent/CardData';
import CardComponent from '../../block/CardComponent/CardComponent';

type CardsListProps = {
  items: CardData[];
};

function CardsList(props: CardsListProps) {
  const { items } = props;
  const cards = items.map((card) => <CardComponent data={card} key={card.id} />);
  return (
    <div style={{ margin: 0 }} className="IndexPage__content-space">
      {cards.length ? cards : <p>No results</p>}
    </div>
  );
}

export default CardsList;
