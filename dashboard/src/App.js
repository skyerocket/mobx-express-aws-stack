import React, {useState} from "react";
import Table from './components/Table';
import Chart from './components/Chart';
import Map from './components/Map';
import { Layout, Menu } from "antd";
import {
  TableOutlined,
  PieChartOutlined,
  HeatMapOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App() {
  const [index, setIndex] = useState(1);
  return (
    <Layout style={{height:'100%'}}>
      <Header style={{color: 'white'}}>
          <div>Dashboard</div>
      </Header>
      <Layout>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item onClick={() => setIndex(1)} key="1" icon={<TableOutlined />}>
              Table
            </Menu.Item>
            <Menu.Item onClick={() => setIndex(2)} key="2" icon={<PieChartOutlined />}>
              Chart
            </Menu.Item>
            <Menu.Item onClick={() => setIndex(3)} key="3" icon={<HeatMapOutlined />}>
              Map
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          {index ===1 && <Table />}
          {index ===2 && <Chart />}
          {index ===3 && <Map />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
