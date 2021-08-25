import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/globals.css';
class Main extends React.Component {
    render() {
        return <>
            <App />
        </>;
    }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Main/>, document.getElementById('root'));

if (typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
    module.hot.accept(); // eslint-disable-line no-undef
}