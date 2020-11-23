import React from 'react';
import classNames from 'classnames';

import './HeaderComponent.css';

type HeaderComponentProps = {
  tab: string;
  tabs: string[];
  onChangeTab: (tab: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeaderComponent(props: HeaderComponentProps) {
  const { tab, tabs, onChangeTab } = props;
  const tabsNodes = tabs.map((tabName) => (
    <button
      key={tabName}
      type="button"
      onClick={() => onChangeTab(tabName)}
      className={classNames('HeaderComponent__tabs-item', { 'HeaderComponent__tabs-item-selected': tabName === tab })}
    >
      {tabName}
    </button>
  ));
  return (
    <header className="HeaderComponent">
      <div className="HeaderComponent__tabs">{tabsNodes}</div>
    </header>
  );
}

export default HeaderComponent;
