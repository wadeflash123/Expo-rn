import React from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

export default class DrawerSiderUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (<ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Text>我</Text>
        <DrawerItems {...this.props} />
        <Text>Footer</Text>
      </SafeAreaView>
    </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
