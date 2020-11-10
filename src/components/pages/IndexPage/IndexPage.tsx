import React from 'react';
import { Spin, Alert } from 'antd';

import './IndexPage.css';

import theMovieDB from '../../../helpers/TheMovieDB';
import CardData from '../../block/CardComponent/CardData';
import GenreData from '../../block/CardComponent/GenreData';
import CardsList from '../../layouts/CardsList/CardsList';

export type IndexPageState = {
  items: CardData[];
  isFetching: boolean;
  fetchingError: string;
};
export type IndexPageProps = {};

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  public state: IndexPageState;

  public constructor(props: IndexPageProps) {
    super(props);
    const items: CardData[] = [];
    this.state = { items, isFetching: false, fetchingError: '' };
  }

  public async componentDidMount() {
    try {
      await this.setState({ isFetching: true, fetchingError: '' });
      const res = await Promise.all([theMovieDB.fetchMovies('return'), theMovieDB.fetchGeneres()]);
      await this.setState({ isFetching: false });
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
      this.setState({ fetchingError: 'ERROR!!!', isFetching: false });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  protected get content(): JSX.Element {
    const { items, isFetching, fetchingError } = this.state;
    if (fetchingError) {
      return <Alert message={fetchingError} type="error" />;
    }
    if (isFetching) {
      return (
        <div className="IndexPage__content-spinner">
          <Spin />
        </div>
      );
    }
    return <CardsList items={items} />;
  }

  public render() {
    return (
      <div className="IndexPage">
        <div className="IndexPage__content">{this.content}</div>
      </div>
    );
  }
}

export default IndexPage;
