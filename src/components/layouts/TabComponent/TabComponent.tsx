import React from 'react';
import { debounce, DebouncedFunc } from 'lodash';
import { Alert, Pagination, Spin } from 'antd';

import './TabComponent.css';

import CardData from '../../block/CardComponent/CardData';
import CardsList from '../CardsList/CardsList';
import SearchComponent from '../../block/SearchComponent/SearchComponent';

export type TabComponentState = {
  items: CardData[];
  isFetching: boolean;
  fetchingError: string;
  search: string;
  page: number;
  totalPages: number;
};

export type TabComponentProps = {
  guestSession: string;
  showSearch: boolean;
  fetchMovies: (params: any) => Promise<any>;
  needUpdateMovies: boolean;
};

class TabComponent extends React.Component<TabComponentProps, TabComponentState> {
  public static defaultProps = {
    showSearch: false,
    needUpdateMovies: true,
  };

  public state: TabComponentState;

  protected debouncedFetchMovies: DebouncedFunc<(params: any) => Promise<void>>;

  public constructor(props: TabComponentProps) {
    super(props);
    const items: CardData[] = [];
    this.debouncedFetchMovies = debounce((params: any) => this.fetchMovies(params), 500);

    this.state = {
      items,
      totalPages: 0,
      isFetching: false,
      fetchingError: '',
      search: 'return',
      page: 1,
    };
  }

  public async componentDidMount() {
    const { search, page } = this.state;
    const { guestSession, needUpdateMovies } = this.props;
    if (needUpdateMovies) {
      await this.fetchMovies({ search, page, sessionId: guestSession });
    }
  }

  public async componentDidUpdate(prevProps: Readonly<TabComponentProps>) {
    const { needUpdateMovies: prevNeedUpdateMovies } = prevProps;
    if (prevNeedUpdateMovies) {
      return;
    }

    const { search, page } = this.state;
    const { guestSession, needUpdateMovies } = this.props;
    if (needUpdateMovies) {
      await this.fetchMovies({ search, page, sessionId: guestSession });
    }
  }

  public onSearch(search: string) {
    const page = 1;
    this.setState({ search, page });
    this.debouncedFetchMovies({ search, page });
  }

  public onPageChange(page: number) {
    const { search } = this.state;
    const { guestSession } = this.props;
    this.setState({ page });
    this.debouncedFetchMovies({ search, page, sessionId: guestSession });
  }

  protected get content(): JSX.Element {
    const { items, isFetching, fetchingError } = this.state;
    const { guestSession } = this.props;
    if (fetchingError) {
      return <Alert message={fetchingError} type="error" />;
    }
    if (isFetching) {
      return (
        <div className="TabComponent__content-spinner">
          <Spin />
        </div>
      );
    }
    return (
      <>
        <CardsList guestSession={guestSession} items={items} />
        {this.paginationNode}
      </>
    );
  }

  protected get paginationNode() {
    const { page, totalPages } = this.state;
    if (totalPages < 2) {
      return null;
    }
    return (
      <div className="TabComponent__content-pagination">
        {totalPages}
        <Pagination
          className="TabComponent__content-pagination"
          size="small"
          current={page}
          defaultCurrent={page}
          total={totalPages}
          showSizeChanger={false}
          onChange={(pageNumber: number) => this.onPageChange(pageNumber)}
        />
      </div>
    );
  }

  protected async fetchMovies(params: any): Promise<void> {
    const { fetchMovies } = this.props;
    try {
      await this.setState({ isFetching: true, fetchingError: '' });
      const res = await fetchMovies(params);
      await this.setState({ isFetching: false });
      this.setState({ items: res.results, totalPages: res.total_pages });
    } catch (error) {
      this.setState({ fetchingError: 'ERROR!!!', isFetching: false });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public render() {
    const { search } = this.state;
    const { showSearch } = this.props;
    const searchNode = (
      <div className="TabComponent-SearchComponent">
        <SearchComponent search={search} onSearch={(searchString: string) => this.onSearch(searchString)} />
      </div>
    );
    return (
      <div className="TabComponent">
        {showSearch ? searchNode : null}
        {this.content}
      </div>
    );
  }
}

export default TabComponent;
