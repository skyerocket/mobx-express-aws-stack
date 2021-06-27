import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

@inject("demoStore")
@observer
class Chart extends Component {
  render() {
    const { chartData } = this.props.demoStore;

    return (
      <ResponsiveContainer width="90%" height={330}>
        <BarChart data={chartData} maxBarSize={20} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" orientation="top" />
          <YAxis type="category" orientation="left" dataKey="name" />
          <Tooltip></Tooltip>
          <Bar dataKey="amount" fill="#8884d8" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;
