import React from 'react';
import { View, List, ListItem, Text } from 'native-base';

export default class OrderList extends React.Component {
  static navigationOptions = {
    title: '订单列表'
  };

  render() {
    return (
      <View>
        <List>
          <ListItem>
            <Text>Simon Mignolet</Text>
          </ListItem>
          <ListItem>
            <Text>Nathaniel Clyne</Text>
          </ListItem>
          <ListItem>
            <Text>Dejan Lovren</Text>
          </ListItem>
        </List>
      </View>
    )
  }
}