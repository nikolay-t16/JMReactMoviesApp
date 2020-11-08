import React from 'react';
import { Card } from 'antd';

import './CardComponent.css';

export type CardComponentProps = {};

function CardComponent() {
  const bodyStyle = {
    padding: 0,
  };
  return (
    <Card className="CardComponent" bodyStyle={bodyStyle}>
      <article className="CardComponent__article">
        <img src="Rectangle36.jpg" alt="" />
        <div className="CardComponent__article-content">
          <h2 className="CardComponent__article-content-title">The way back</h2>
          <div className="CardComponent__article-content-date">March 5, 2020</div>
          <div className="CardComponent__article-content-tags">
            <div className="CardComponent__article-content-tags-item">Action</div>
            <div className="CardComponent__article-content-tags-item">Drama</div>
          </div>
          <div className="CardComponent__article-content-text">
            A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
            attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
          </div>
        </div>
      </article>
    </Card>
  );
}

export default CardComponent;
