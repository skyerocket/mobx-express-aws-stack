import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import axios from 'axios'

class AppState {
    @observable data = [];

    constructor() {
        axios.get('https://rhqum14u84.execute-api.us-east-1.amazonaws.com/dev').then(response => this.data.push(response.data.items))
    }
}

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
    render() {
        return (
            <div>
                This is Mobx frontend: {this.props.appState.data[0]}
            </div>
        );
     }
};

const appState = new AppState();
ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));
