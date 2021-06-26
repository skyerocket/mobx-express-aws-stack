import { observable, action, runInAction, reaction, computed } from "mobx";
import axios from "axios";
import Geocode from "react-geocode";

const API_KEY = process.env.REACT_APP_GEOLOCATION_KEY;
class UserDataStore {
  @observable tableData = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    Geocode.setApiKey(API_KEY);
    this.loadData()
    // this.userLocation();
  }

  // @action("Search for user location")
  // userLocation() {
  //   if (!this.user.location) return [];

  //   return Geocode.fromAddress(this.user.location).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       runInAction(
  //         "Update State after getting user's location coordinates",
  //         () => {
  //           this.location = [
  //             {
  //               name: this.user.location,
  //               coordinates: [lng, lat],
  //               markerOffset: -15,
  //             },
  //           ];
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  @action("Get table data on load")
  loadData = async () => {
    const url = `https://rhqum14u84.execute-api.us-east-1.amazonaws.com/dev/db`;
    const response = await axios.get(url, { crossDomain: true});
    runInAction("Update State after fetching table data", () => {
      this.tableData = response.data
    });
  };

  @computed
  get dataForTable() {
    return this.tableData.map(row => ({name: row.name, type: row.type, description: row.description, status: row.status, percent: row.percentComplete}))
  }

  @computed
  get chartData() {
    return [
      {name: "TRRAIN", amount: this.tableData.filter(row => row.type === 'TERRAIN').length},
      {name: "IMAGERY", amount: this.tableData.filter(row => row.type === 'IMAGERY').length},
      {name: "3DTILES", amount: this.tableData.filter(row => row.type === '3DTILES').length},
    ]
  }
}

export default UserDataStore;
