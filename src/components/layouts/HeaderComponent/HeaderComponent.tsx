import React from 'react';

import './HeaderComponent.css';

import SearchComponent from '../../block/SearchComponent/SearchComponent';
import HeaderTabs from '../../block/HeaderTabs/HeaderTabs';

type HeaderComponentProps = {
  onSearch: (search: string) => void;
};

function HeaderComponent(props: HeaderComponentProps) {
  const { onSearch } = props;
  return (
    <header className="HeaderComponent">
      <div className="HeaderComponent__HeaderTabs">
        <HeaderTabs />
      </div>
      <SearchComponent onSearch={onSearch} />
    </header>
  );
}

export default HeaderComponent;
