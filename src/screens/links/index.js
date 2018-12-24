import React from 'react';
import { Platform, StatusBar, ScrollView, StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
// error: Tried to register two views with the same name GestureHandler RootView
// import { FlatList } from 'react-navigation';

const data = new Array(150).fill(0);

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      (Platform.OS === 'android') && StatusBar.setBackgroundColor('blue');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  renderItem = ({ index }) => {
    return (
      <View style={{ height: 50 }}>
        <Text style={{ textAlign: 'center' }}>Item {index}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => (item + '_' + index)}
          contentContainerStyle={{ padding: 10 }}
        />
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
