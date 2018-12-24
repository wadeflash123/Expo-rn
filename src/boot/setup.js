import * as Expo from "expo";
import { connect, bindActionCreators } from 'react-redux';
import React, { Component } from "react";
import { Root, StyleProvider, Text } from "native-base";

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Root>
          <App/>
        </Root>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(props)
  return {}
}

export default connect(mapStateToProps, {})(Setup);