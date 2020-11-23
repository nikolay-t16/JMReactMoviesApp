import React from 'react';

import TabComponent from '../TabComponent/TabComponent';
import theMovieDB from '../../../helpers/TheMovieDB';

export type SearchTabProps = {
  guestSession: string;
};

function SearchTab(props: SearchTabProps) {
  const { guestSession } = props;
  const fetchMovies = (params: any): Promise<void> => theMovieDB.fetchMovies(params);

  return <TabComponent showSearch fetchMovies={fetchMovies} guestSession={guestSession} />;
}

export default SearchTab;
