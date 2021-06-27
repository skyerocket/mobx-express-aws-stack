import { observable, action, runInAction, computed } from "mobx";
import axios from "axios";

const myApi = `https://rhqum14u84.execute-api.us-east-1.amazonaws.com/dev/db`;
const cityApi = `https://data.gov.au/dataset/138d9263-600f-4d35-993d-f1cec7ebcfdf/resource/ec9115f0-e762-4528-850b-ef7189ef18b4/download/city-of-casey.geojson`

class DemoStore {
  @observable tableData = [];
  @observable cityGeoData = {}

  constructor() {
    this.loadData(myApi);
    this.loadData(cityApi)
  }

  @action("Get table data on load")
  loadData = async url => {
    const response = await axios.get(url, { crossDomain: true });
    runInAction("Update State after fetching data", () => {
      if (url === myApi) {
        this.tableData = response.data;
      }
      if (url === cityApi) {
        this.cityGeoData = response.data;
      }
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
  get dataForMap() {
    return this.cityGeoData
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
