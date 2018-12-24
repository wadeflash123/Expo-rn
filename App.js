import React from "react";
import Setup from "./src/boot/setup";
import {Provider} from 'react-redux';
import {configureStore} from './src/store/index'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return <Provider store={store}><Setup /></Provider>;
  }
}
