import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Icon } from "native-base";
import { userLoginOut } from '../../actions/user';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'set',
  };
  constructor(props) {
    super(props);
    this.state = {}
  }

  beerBtnPress = () => {
    this.props.userLoginOut({ cb: (res) => {
      if (res.code === 0) {
        this.props.navigation.navigate('AuthLoading')
      }
    }})
  }

  openSetDrawer = () => {
    this.props.navigation.openDrawer();
  }

  render() {
    let { beerBtnPress, openSetDrawer } = this
    let { userBalance } = this.props
    console.log('set balance', userBalance)
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Button danger rounded full
          onPress={beerBtnPress}
        >
          <Icon name='beer' />
          <Text>Sign Out</Text>
        </Button>
        <Button danger rounded full
          onPress={openSetDrawer}
        >
          <Icon name='beer' />
          <Text>set drawer</Text>
        </Button>
        <Button danger rounded full
          onPress={() => this.props.navigation.navigate('OrderList')}
        >
          <Icon name='beer' />
          <Text>LIST A</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  let { user } = state
  return {
    userBalance: user.userBalance
  }
}

export default connect(mapStateToProps, {
  userLoginOut
})(SettingsScreen);
