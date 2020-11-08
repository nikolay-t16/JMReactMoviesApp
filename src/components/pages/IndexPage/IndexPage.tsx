import React from 'react';
import { Space } from 'antd';

import './IndexPage.css';

import CardComponent from '../../block/CardComponent/CardComponent';

export type IndexPageState = {};
export type IndexPageProps = {};

class IndexPage extends React.Component<IndexPageState, IndexPageProps> {
  public state: IndexPageState;

  public constructor(props: IndexPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          <Space className="IndexPage__content-space">
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </Space>
        </div>
      </div>
    );
  }
}

export default IndexPage;
