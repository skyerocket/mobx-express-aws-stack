import React from "react";
import { Table as AntTable, Input, Button, Space, Tag } from "antd";
import "antd/dist/antd.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";

@inject("demoStore")
@observer
class Table extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { dataForTable } = this.props.demoStore;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "20%",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ...this.getColumnSearchProps("description"),
        width: "40%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
        width: "10%",
        render: (status) => {
          let color;
          switch (status) {
            case "COMPLETE":
              color = "green";
              break;
            case "IN PROGRESS":
              color = "geekblue";
              break;
            default:
              color = "volcano";
          }
          return (
            <Tag color={color} key={status}>
              {status}
            </Tag>
          );
        },
      },
      {
        title: "Percent",
        dataIndex: "percent",
        key: "percent",
        ...this.getColumnSearchProps("percent"),
        sorter: (a, b) => a.percent - b.percent,
        sortDirections: ["descend", "ascend"],
        width: "10%",
      },
    ];
    return (
      <AntTable
        style={{ width: '100%' }}
        columns={columns}
        dataSource={dataForTable}
      />
    );
  }
}

export default Table;
