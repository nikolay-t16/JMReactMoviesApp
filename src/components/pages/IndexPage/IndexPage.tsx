import React, { ErrorInfo } from 'react';
import { Alert } from 'antd';
import './IndexPage.css';

import theMovieDB from '../../../helpers/TheMovieDB';
import GenreData from '../../block/CardComponent/GenreData';
import HeaderComponent from '../../layouts/HeaderComponent/HeaderComponent';
import SearchTab from '../../layouts/SearchTab/SearchTab';
import RatedTab from '../../layouts/RatedTab/RatedTab';
import { IndexPageContextProvider } from './IndexPageContext';

export type IndexPageState = {
  fetchingError: string;
  guestSession: string;
  genres: GenreData[];
  tab: string;
};
export type IndexPageProps = {};

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  protected readonly TAB_SEARCH = 'search';

  protected readonly TAB_RATED = 'rated';

  protected readonly tabs = [this.TAB_SEARCH, this.TAB_RATED];

  public state: IndexPageState = {
    fetchingError: '',
    guestSession: '',
    tab: this.TAB_SEARCH,
    // eslint-disable-next-line react/no-unused-state
    genres: [],
  };

  public async componentDidMount() {
    try {
      const response = await Promise.all([theMovieDB.fetchGuestSession(), theMovieDB.fetchGeneres()]);
      this.setState({
        guestSession: response[0].guest_session_id,
        genres: response[1].genres,
      });
    } catch (error) {
      this.setState({ fetchingError: 'ERROR!!!' });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ fetchingError: 'ERROR!!!' });
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  protected onChangeTab(tab: string) {
    this.setState({ tab });
  }

  protected get content(): JSX.Element {
    const { fetchingError, tab, guestSession } = this.state;
    if (fetchingError) {
      return <Alert message={fetchingError} type="error" />;
    }
    if (tab === this.TAB_RATED) {
      return <RatedTab guestSession={guestSession} />;
    }
    return <SearchTab guestSession={guestSession} />;
  }

  public render() {
    const { tab, genres, guestSession } = this.state;
    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          <HeaderComponent tab={tab} tabs={this.tabs} onChangeTab={(tabName) => this.onChangeTab(tabName)} />
          <IndexPageContextProvider genres={genres} guestSession={guestSession}>
            {this.content}
          </IndexPageContextProvider>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}

export default IndexPage;
