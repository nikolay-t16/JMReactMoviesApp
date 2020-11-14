import React from 'react';

import './HeaderTabs.css';

function HeaderTabs() {
  return (
    <div className="HeaderTabs">
      <div className="HeaderTabs__item HeaderTabs__item-selected">Search</div>
      <div className="HeaderTabs__item">Rated</div>
    </div>
  );
}

export default HeaderTabs;
