import { observable, action, runInAction, computed } from "mobx";
import axios from "axios";

class DemoStore {
  @observable tableData = [];

  constructor() {
    this.loadData();
  }

  @action("Get table data on load")
  loadData = async () => {
    const url = `https://rhqum14u84.execute-api.us-east-1.amazonaws.com/dev/db`;
    const response = await axios.get(url, { crossDomain: true });
    runInAction("Update State after fetching table data", () => {
      this.tableData = response.data;
    });
  };

  @computed
  get dataForTable() {
    return this.tableData.map((row) => ({
      name: row.name,
      type: row.type,
      description: row.description,
      status: row.status,
      percent: row.percentComplete,
    }));
  }

  @computed
  get chartData() {
    return [
      {
        name: "TRRAIN",
        amount: this.tableData.filter((row) => row.type === "TERRAIN").length,
      },
      {
        name: "IMAGERY",
        amount: this.tableData.filter((row) => row.type === "IMAGERY").length,
      },
      {
        name: "3DTILES",
        amount: this.tableData.filter((row) => row.type === "3DTILES").length,
      },
    ];
  }
}

const demoStore = new DemoStore()

export default demoStore;
