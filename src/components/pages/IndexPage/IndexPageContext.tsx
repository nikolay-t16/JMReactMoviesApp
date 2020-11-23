import React from 'react';
import GenreData from '../../block/CardComponent/GenreData';

const IndexPageContext = React.createContext({});
const { Provider, Consumer } = IndexPageContext;

type IndexPageContextProviderProps = {
  genres: GenreData[];
  guestSession: string;
  // eslint-disable-next-line react/require-default-props
  children?: JSX.Element;
};

function IndexPageContextProvider(props: IndexPageContextProviderProps) {
  const { children, genres, guestSession } = props;
  return <Provider value={{ genres, guestSession }}>{children}</Provider>;
}

export default IndexPageContext;

export { IndexPageContextProvider, Consumer as IndexPageContextConsumer };
