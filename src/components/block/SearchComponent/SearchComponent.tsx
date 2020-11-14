import React from 'react';

import './SearchComponent.css';

type SearchComponentProps = {
  onSearch: (search: string) => void;
};
type SearchComponentState = {
  search: string;
};

class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
  public state: SearchComponentState;

  public constructor(props: SearchComponentProps) {
    super(props);
    this.state = { search: '' };
  }

  public onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onSearch } = this.props;
    this.setState({ search: event.target.value });
    const { search } = this.state;
    onSearch(search);
  }

  public render() {
    return (
      <input
        className="SearchComponent"
        placeholder="Type to search..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChange(event)}
      />
    );
  }
}

export default SearchComponent;
