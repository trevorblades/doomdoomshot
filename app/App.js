/* eslint-disable unicorn/filename-case, new-cap */
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Font} from 'expo'; // eslint-disable-line import/named

import Game from './screens/game';
import Menu from './screens/menu';
import {
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMI_BOLD,
  FONT_FAMILY_BOLD,
} from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  state = {
    fontsLoaded: false,
    playing: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      [FONT_FAMILY_REGULAR]: require('./assets/fonts/Montserrat-Regular.ttf'),
      [FONT_FAMILY_SEMI_BOLD]: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      [FONT_FAMILY_BOLD]: require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({fontsLoaded: true});
  }

  startGame = () => this.setState({playing: true});

  quitGame = () => this.setState({playing: false});

  renderContent() {
    if (this.state.playing) {
      return <Game quitGame={this.quitGame} />;
    }
    return (
      <Menu loading={!this.state.fontsLoaded} startGame={this.startGame} />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}
