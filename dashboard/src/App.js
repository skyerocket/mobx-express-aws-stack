import React from "react";
import Table from './components/Table';
import Chart from './components/Chart';
import Map from './components/Map';

function App() {
  return (
    <>
      <h1>Dashboard</h1>
      <Table />
      <Chart />
      <Map />
    </>
  );
}

export default App;
