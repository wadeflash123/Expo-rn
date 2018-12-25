import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Icon } from "native-base";
import { userLoginOut } from '../../actions/user';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  constructor(props) {
    super(props);
    this.state = {}
  }

  beerBtnPress = () => {
    console.log('[[[[[[[[[[')
    this.props.userLoginOut((res) => {
      console.log('out', res)
      if (res.code === 0) {
        this.props.navigation.navigate('AuthLoading')
      }
    })
  }

  render() {
    let { beerBtnPress } = this
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>Set</Text>
        <Button danger rounded full
          onPress={beerBtnPress}
        >
          <Icon name='beer' />
          <Text>Sign Out</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
  userLoginOut
})(SettingsScreen);
