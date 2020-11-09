import React from 'react';
import { Card } from 'antd';
import { format } from 'date-fns';

import './CardComponent.css';
import CardData from './CardData';
import { subStringWithWords } from '../../../helpers/StringHelper';

export type CardComponentProps = { data: CardData };

function CardComponent(props: CardComponentProps) {
  const { data } = props;
  const bodyStyle = {
    padding: 0,
  };

  const genres: JSX.Element[] = [];
  if (data.genres) {
    const genresCount = data.genres.length <= 3 ? data.genres.length : 3;
    for (let i = 0; i < genresCount; i++) {
      const genre = data.genres[i];
      genres.push(
        <div key={genre.id} className="CardComponent__article-content-tags-item" title={genre.name}>
          {subStringWithWords(genre.name, 12)}
        </div>,
      );
    }
  }
  const imgStyle = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})` };
  return (
    <Card className="CardComponent" bodyStyle={bodyStyle}>
      <article className="CardComponent__article">
        <div className="CardComponent__article-img" style={imgStyle} />
        <div className="CardComponent__article-content">
          <h2 className="CardComponent__article-content-title">{data.title}</h2>
          <div className="CardComponent__article-content-date">
            {format(new Date(data.release_date), 'MMM d, yyyy')}
          </div>
          {genres.length ? <div className="CardComponent__article-content-tags">{genres}</div> : null}
          <div className="CardComponent__article-content-text">{subStringWithWords(data.overview, 200)}</div>
        </div>
      </article>
    </Card>
  );
}

export default CardComponent;
