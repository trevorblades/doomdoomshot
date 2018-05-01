/* eslint-disable unicorn/filename-case, new-cap */
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {SwitchNavigator} from 'react-navigation';

import Game from './screens/game';
import Menu from './screens/menu';

const Navigator = SwitchNavigator({
  Menu,
  Game,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    );
  }
}
