import React from 'react';

import TabComponent from '../TabComponent/TabComponent';
import theMovieDB from '../../../helpers/TheMovieDB';

export type RatedTabProps = {
  guestSession: string;
  needUpdateMovies: boolean;
};

function RatedTab(props: RatedTabProps) {
  const { guestSession, needUpdateMovies } = props;
  const fetchMovies = (params: any): Promise<void> => theMovieDB.fetchRatedMovies(params);

  return (
    <TabComponent
      showSearch
      needUpdateMovies={needUpdateMovies}
      fetchMovies={fetchMovies}
      guestSession={guestSession}
    />
  );
}

export default RatedTab;
