import React from 'react';

import TabComponent from '../TabComponent/TabComponent';
import theMovieDB from '../../../helpers/TheMovieDB';

export type RatedTabProps = {
  guestSession: string;
};

function RatedTab(props: RatedTabProps) {
  const { guestSession } = props;
  const fetchMovies = (params: any): Promise<void> => theMovieDB.fetchRatedMovies(params);

  return <TabComponent showSearch fetchMovies={fetchMovies} guestSession={guestSession} />;
}

export default RatedTab;
