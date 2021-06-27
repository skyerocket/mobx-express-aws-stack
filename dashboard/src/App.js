import React from "react";
import Table from './components/Table';
import Chart from './components/Chart';
import Map from './components/Map';
import { Tabs, Layout, Card, Tooltip } from "antd";
import * as Icon from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header style={{color: 'white'}}>Dashboard</Header>
        <Content>
          <Tabs defaultActiveKey="0">
            <Tabs.TabPane tab={(<React.Fragment><Tooltip placement="bottom" title='Table'>Table</Tooltip></React.Fragment>)} key={0}>
              <Table />
            </Tabs.TabPane>
            <Tabs.TabPane tab={(<React.Fragment><Tooltip placement="bottom" title='Chart'>Chart</Tooltip></React.Fragment>)} key={1}>
              <Chart />
            </Tabs.TabPane>
            <Tabs.TabPane tab={(<React.Fragment><Tooltip placement="bottom" title='Map'>Map</Tooltip></React.Fragment>)} key={2}>
              <Map />
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </Layout>
    </>
  );
}

export default App;
