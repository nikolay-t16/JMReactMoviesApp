import React, { ErrorInfo } from 'react';
import { Alert, Tabs } from 'antd';
import './IndexPage.css';

import theMovieDB from '../../../helpers/TheMovieDB';
import GenreData from '../../block/CardComponent/GenreData';
import SearchTab from '../../layouts/SearchTab/SearchTab';
import RatedTab from '../../layouts/RatedTab/RatedTab';
import { IndexPageContextProvider } from './IndexPageContext';

export type IndexPageState = {
  fetchingError: string;
  guestSession: string;
  genres: GenreData[];
  needUpdateRatedMovies: boolean;
};
export type IndexPageProps = {};

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  protected readonly TAB_SEARCH = 'search';

  protected readonly TAB_RATED = 'rated';

  protected readonly tabs = [this.TAB_SEARCH, this.TAB_RATED];

  public state: IndexPageState = {
    fetchingError: '',
    guestSession: '',
    genres: [],
    needUpdateRatedMovies: false,
  };

  public async componentDidMount() {
    try {
      const response = await Promise.all([theMovieDB.fetchGuestSession(), theMovieDB.fetchGeneres()]);
      this.setState({
        guestSession: response[0].guest_session_id,
        genres: response[1].genres,
      });
    } catch (error) {
      this.setState({ fetchingError: `Error: ${error.message}` });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ fetchingError: `Error: ${error.message}` });
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  protected get content(): JSX.Element {
    const { fetchingError, genres, guestSession, needUpdateRatedMovies } = this.state;
    if (fetchingError) {
      return <Alert message={fetchingError} type="error" />;
    }
    const { TabPane } = Tabs;
    return (
      <IndexPageContextProvider genres={genres} guestSession={guestSession}>
        <>
          <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
            <TabPane tab="Search" key={this.TAB_SEARCH}>
              <SearchTab guestSession={guestSession} />
            </TabPane>
            <TabPane tab="Rated" key={this.TAB_RATED}>
              <RatedTab needUpdateMovies={needUpdateRatedMovies} guestSession={guestSession} />
            </TabPane>
          </Tabs>
        </>
      </IndexPageContextProvider>
    );
  }

  protected onChangeTab = (tab: string) => {
    this.setState({ needUpdateRatedMovies: tab === this.TAB_RATED });
  };

  public render() {
    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          {this.content}
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}

export default IndexPage;
