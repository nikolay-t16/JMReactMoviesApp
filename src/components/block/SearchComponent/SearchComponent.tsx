import React from 'react';

import './SearchComponent.css';

type SearchComponentProps = {
  onSearch: (search: string) => void;
  search: string;
};
type SearchComponentState = {
  search: string;
};

class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
  public state: SearchComponentState;

  public constructor(props: SearchComponentProps) {
    super(props);
    this.state = { search: props.search };
  }

  public onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onSearch } = this.props;
    const search = event.target.value;
    this.setState({ search });
    onSearch(search);
  }

  public render() {
    const { search } = this.state;
    return (
      <input
        className="SearchComponent"
        placeholder="Type to search..."
        value={search}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => this.onChange(event)}
      />
    );
  }
}

export default SearchComponent;
