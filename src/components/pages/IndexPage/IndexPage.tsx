import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { DebouncedFunc, debounce } from 'lodash';

import './IndexPage.css';

import theMovieDB from '../../../helpers/TheMovieDB';
import CardData from '../../block/CardComponent/CardData';
import GenreData from '../../block/CardComponent/GenreData';
import CardsList from '../../layouts/CardsList/CardsList';
import HeaderComponent from '../../layouts/HeaderComponent/HeaderComponent';

export type IndexPageState = {
  items: CardData[];
  isFetching: boolean;
  fetchingError: string;
  search: string;
  page: number;
  pages: number;
};
export type IndexPageProps = {};

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  public state: IndexPageState;

  protected debouncedFetchMovies: DebouncedFunc<(search: string, page: number) => Promise<void>>;

  public constructor(props: IndexPageProps) {
    super(props);
    const items: CardData[] = [];
    this.debouncedFetchMovies = debounce((search: string, page: number) => this.fetchMovies(search, page), 500);

    this.state = {
      items,
      pages: 0,
      isFetching: false,
      fetchingError: '',
      search: 'return',
      page: 1,
    };
  }

  public async componentDidMount() {
    const { search, page } = this.state;
    await this.fetchMovies(search, page);
  }

  public onSearch(search: string) {
    this.setState({ search, page: 1 });
    this.debouncedFetchMovies(search, 1);
  }

  public onPageChange(page: number) {
    const { search } = this.state;
    this.setState({ page });
    this.debouncedFetchMovies(search, page);
  }

  protected get content(): JSX.Element {
    const { items, isFetching, fetchingError, page, pages } = this.state;
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
    return (
      <>
        <CardsList items={items} />
        <div className="IndexPage__content-pagination">
          <Pagination
            className="IndexPage__content-pagination"
            size="small"
            current={page}
            defaultCurrent={page}
            total={pages}
            showSizeChanger={false}
            onChange={(pageNumber: number) => this.onPageChange(pageNumber)}
          />
        </div>
      </>
    );
  }

  protected async fetchMovies(search: string, page: number): Promise<void> {
    try {
      await this.setState({ isFetching: true, fetchingError: '' });
      const res = await Promise.all([theMovieDB.fetchMovies(search, page), theMovieDB.fetchGeneres()]);
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
      this.setState({ items: res[0].results, pages: res[0].total_pages });
    } catch (error) {
      this.setState({ fetchingError: 'ERROR!!!', isFetching: false });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public render() {
    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          <HeaderComponent onSearch={(search: string) => this.onSearch(search)} />
          {this.content}
        </div>
      </div>
    );
  }
}

export default IndexPage;
