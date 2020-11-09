import React from 'react';
import { Space } from 'antd';

import './IndexPage.css';

import CardComponent from '../../block/CardComponent/CardComponent';
import theMovieDB from '../../../helpers/TheMovieDB';
import CardData from '../../block/CardComponent/CardData';
import GenreData from '../../block/CardComponent/GenreData';

export type IndexPageState = {
  items: CardData[];
};
export type IndexPageProps = {};

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  public state: IndexPageState;

  public constructor(props: IndexPageProps) {
    super(props);
    const items: CardData[] = [];
    this.state = { items };
  }

  public async componentDidMount() {
    try {
      const res = await Promise.all([theMovieDB.fetchMovies('return'), theMovieDB.fetchGeneres()]);
      const { genres } = res[1] as { genres: GenreData[] };
      const items = res[0].results;
      items.forEach((item: CardData) => {
        item.genre_ids.forEach((genreId) => {
          const genre = genres.find((genreItem) => genreItem.id === genreId);
          if (genre) {
            if (typeof item.genres === 'undefined') {
              // eslint-disable-next-line no-param-reassign
              item.genres = [];
            }
            item.genres.push(genre);
          }
        });
      });

      this.setState({ items: res[0].results });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public render() {
    const { items } = this.state;
    const cards = items.map((card) => <CardComponent data={card} key={card.id} />);
    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          <Space className="IndexPage__content-space">{cards.length ? cards : <p>No results</p>}</Space>
        </div>
      </div>
    );
  }
}

export default IndexPage;
